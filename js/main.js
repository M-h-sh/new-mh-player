$(document).ready(function() {
  var songs = [
    "Bruce_Africa_-_You",
    "de-mthuda-da-muziqal-chef-eemoh-sgudi-snyc-ft-sipho-magudulela",
    "Tebza_De_DJ_ft_DJ_Nomza_The_King_-_Ka_Valungu_Remix",
	"Umjabulisi  Vuma Original Audio"
  ];
  var currentIndex = 0;
  var audio = new Audio();
  var isPlaying = false;
  var isRepeatAll = false;
  var isRepeatCurrent = false;
  var isShuffle = false;
  var isAccordionActive = false;
  var activePlaylist = null;
  var activeIndex = 0;

  function downloadSong() {
    var downloadLink = document.createElement("a");
    downloadLink.href = "files/" + songs[currentIndex] + ".mp3";
    downloadLink.download = songs[currentIndex] + ".mp3";
    downloadLink.click();
  }

  $("#download").click(function() {
    downloadSong();
  });

  $(".accordion-title").click(function() {
    var accordionContent = $(this).next(".accordion-content");
    if (accordionContent.is(":animated")) {
      return;
    }

    $(this).toggleClass("active");
    accordionContent.slideToggle(function() {
      isAccordionActive = accordionContent.is(":visible");
      if (isAccordionActive) {
        activePlaylist = accordionContent.find("ul");
        activeIndex = activePlaylist.find("li.active").index();
        loadSongFromPlaylist(activePlaylist, activeIndex);
      }
    });
  });

  function loadSongFromPlaylist(playlist, currentIndex) {
    var songs = playlist.find("li");
    songs.removeClass("active");
    songs.eq(currentIndex).addClass("active");

    var song = songs.eq(currentIndex).text();
    var songIndex = songs.eq(currentIndex).index();
    $("#song-title").text(song);

    // Update the tabs and other elements
    $("#tabs a").removeClass("active");
    $("#tabs a").eq(songIndex).addClass("active");
    $(".accordion-title").removeClass("active");
    $(".accordion-title").eq(songIndex).addClass("active");

    var songUrl = "files/" + songs[currentIndex] + ".mp3";
    if (audio.src !== songUrl) {
      // Load the selected song
      loadSong(songUrl);
      playSong();
    } else {
      togglePlayPause();
    }
  }

  function loadSong(songUrl) {
    audio.src = songUrl;
    audio.load();
  }

  audio.addEventListener("ended", function() {
    if (isRepeatCurrent) {
      loadSong();
      playSong();
    } else if (isShuffle) {
      var randomIndex = Math.floor(Math.random() * songs.length);
      currentIndex = randomIndex;
      loadSong();
      playSong();
    } else if (isRepeatAll) {
      currentIndex++;
      if (currentIndex >= songs.length) {
        currentIndex = 0;
      }
      loadSong();
      playSong();
    } else {
      currentIndex++;
      if (currentIndex >= songs.length) {
        pauseSong();
      } else {
        loadSong();
        playSong();
      }
    }
  });

  function loadSong() {
    audio.src = "files/" + songs[currentIndex] + ".mp3";
    $("#song-title").text(songs[currentIndex]);
    $(".playlist li").removeClass("active");
    $(".playlist li:eq(" + currentIndex + ")").addClass("active");
    $(".accordion-content li").removeClass("active");
    $(".accordion-content li:eq(" + currentIndex + ")").addClass("active");
  }

  function playSong() {
    audio.play();
    $("#play").html('<i class="fas fa-pause"></i>');
    isPlaying = true;
  }

  function pauseSong() {
    audio.pause();
    $("#play").html('<i class="fas fa-play"></i>');
    isPlaying = false;
  }

  function togglePlayPause() {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  }

  function nextSong() {
    if (isShuffle) {
      currentIndex = Math.floor(Math.random() * songs.length);
    } else {
      currentIndex++;
      if (currentIndex >= songs.length) {
        currentIndex = 0;
      }
    }
    loadSong();
    playSong();
  }

  function prevSong() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = songs.length - 1;
    }
    loadSong();
    playSong();
  }

  function updateRecentlyPlayed() {
    var recentlyPlayed = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
    if (!recentlyPlayed.includes(songs[currentIndex])) {
      recentlyPlayed.unshift(songs[currentIndex]);
      if (recentlyPlayed.length > 10) {
        recentlyPlayed.pop();
      }
    } else {
      // Move the song to the top of the recently played list
      var songIndex = recentlyPlayed.indexOf(songs[currentIndex]);
      recentlyPlayed.splice(songIndex, 1);
      recentlyPlayed.unshift(songs[currentIndex]);
    }
    localStorage.setItem("recentlyPlayed", JSON.stringify(recentlyPlayed));

    // Update the recently played playlist immediately
    updateRecentlyPlayedPlaylist();
  }

  function updateRecentlyPlayedPlaylist() {
    var recentlyPlayed = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
    $(".recently-played-list").empty();
    for (var i = 0; i < recentlyPlayed.length; i++) {
      var song = recentlyPlayed[i];
      var li = $("<li>").text(song);
      if (i === currentIndex && $("#recently-played-tab").hasClass("active")) {
        li.addClass("active");
      }
      li.click(function() {
        currentIndex = songs.indexOf($(this).text());
        loadSong();
        playSong();
        var currentSong = songs[currentIndex];
        increasePlayCount(currentSong);
      });
      $(".recently-played-list").append(li);
    }
  }

  function increasePlayCount(song) {
    var mostPlayed = JSON.parse(localStorage.getItem("mostPlayed")) || {};
    if (mostPlayed[song]) {
      mostPlayed[song]++;
    } else {
      mostPlayed[song] = 1;
    }
    localStorage.setItem("mostPlayed", JSON.stringify(mostPlayed));

    updateMostPlayed();
  }

  function updateMostPlayed() {
    var mostPlayed = JSON.parse(localStorage.getItem("mostPlayed")) || {};
    var sortedSongs = Object.keys(mostPlayed).sort(function(a, b) {
      return mostPlayed[b] - mostPlayed[a];
    });
    $(".most-played-list").empty();
    for (var i = 0; i < Math.min(sortedSongs.length, 3); i++) {
      var song = sortedSongs[i];
      var li = $("<li>").text(song + " (" + mostPlayed[song] + ")");
      if (i === currentIndex && $("#most-played-tab").hasClass("active")) {
        li.addClass("active");
      }
      li.click(function() {
        var clickedSong = $(this).text().split(" (")[0];
        currentIndex = songs.indexOf(clickedSong);
        loadSong();
        playSong();
        increasePlayCount(clickedSong);
      });
      $(".most-played-list").append(li);
    }
  }

  function loadPlaylist() {
    var recentlyPlayed = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
    for (var i = 0; i < Math.min(recentlyPlayed.length, 2); i++) {
      var song = recentlyPlayed[i];
      var li = $("<li>").text(song);
      if (i === currentIndex && $("#recently-played-tab").hasClass("active")) {
        li.addClass("active");
      }
      li.click(function() {
        currentIndex = songs.indexOf($(this).text());
        loadSong();
        playSong();
        var currentSong = songs[currentIndex];
        increasePlayCount(currentSong);
      });
      $(".recently-played-list").append(li);
    }

    for (var i = 0; i < songs.length; i++) {
      var song = songs[i];
      var li = $("<li>").text(song);
      if (i === currentIndex && $("#all-songs-tab").hasClass("active")) {
        li.addClass("active");
      }
      li.click(function() {
        currentIndex = songs.indexOf($(this).text());
        loadSong();
        playSong();
        var currentSong = songs[currentIndex];
        increasePlayCount(currentSong);
      });
      $(".playlist").append(li);
    }
  }

  $("#play").click(function() {
    togglePlayPause();
    var currentSong = songs[currentIndex];
    increasePlayCount(currentSong);
  });

  $("#next").click(function() {
    nextSong();
    var currentSong = songs[currentIndex];
    increasePlayCount(currentSong);
  });

  $("#prev").click(function() {
    prevSong();
    var currentSong = songs[currentIndex];
    increasePlayCount(currentSong);
  });

  $("#repeat-all").click(function() {
    isRepeatAll = !isRepeatAll;
    $(this).toggleClass("active", isRepeatAll);
  });

  $("#repeat-current").click(function() {
    isRepeatCurrent = !isRepeatCurrent;
    $(this).toggleClass("active", isRepeatCurrent);
  });

  $("#shuffle").click(function() {
    isShuffle = !isShuffle;
    $(this).toggleClass("active", isShuffle);
  });

  $("#volume").on("input", function() {
    var volume = $(this).val();
    audio.volume = volume;
  });

  function updateProgressBar() {
    var currentTime = audio.currentTime;
    var duration = audio.duration;
    var progressPercentage = (currentTime / duration) * 100;
    $("#progress").css("width", progressPercentage + "%");
    updateTimer(currentTime, duration);
  }

  function updateTimer(currentTime, duration) {
    var currentMinutes = Math.floor(currentTime / 60);
    var currentSeconds = Math.floor(currentTime % 60);
    var durationMinutes = Math.floor(duration / 60);
    var durationSeconds = Math.floor(duration % 60);
    $("#timer").text(
      currentMinutes + ":" + formatTime(currentSeconds) + " / " + durationMinutes + ":" + formatTime(durationSeconds)
    );
  }

  function formatTime(time) {
    return time < 10 ? "0" + time : time;
  }

  function seekSong(event) {
    var timerWidth = $("#timer").width();
    var clickX = event.pageX - $(this).offset().left;
    var percent = clickX / timerWidth;
    var seekTime = audio.duration * percent;
    audio.currentTime = seekTime;
  }

  $("#timer").click(seekSong);

  audio.addEventListener("timeupdate", function() {
    updateProgressBar();
  });

  function searchSongs(searchTerm) {
    var filteredSongs = songs.filter(function(song) {
      return song.toLowerCase().includes(searchTerm.toLowerCase());
    });

    $(".playlist").empty();

    for (var i = 0; i < filteredSongs.length; i++) {
      var song = filteredSongs[i];
      var li = $("<li>").text(song);
      if (i === currentIndex && $("#all-songs-tab").hasClass("active")) {
        li.addClass("active");
      }
      li.click(function() {
        currentIndex = songs.indexOf($(this).text());
        loadSong();
        playSong();
        var currentSong = songs[currentIndex];
        increasePlayCount(currentSong);
      });
      $(".playlist").append(li);
    }
  }

  $("#search-input").on("input", function() {
    var searchTerm = $(this).val();
    searchSongs(searchTerm);
  });

  function highlightPreviousSong() {
    var $currentItem = $(".playlist li.active");
    var $prevItem = $currentItem.prev();
    if ($prevItem.length > 0) {
      $currentItem.removeClass("active");
      $prevItem.addClass("active");
      scrollToActiveItem();
    }
  }

  function highlightNextSong() {
    var $currentItem = $(".playlist li.active");
    var $nextItem = $currentItem.next();
    if ($nextItem.length > 0) {
      $currentItem.removeClass("active");
      $nextItem.addClass("active");
      scrollToActiveItem();
    }
  }

  function scrollToActiveItem() {
    var $activeItem = $(".playlist li.active");
    var containerTop = $(".playlist").scrollTop();
    var containerBottom = containerTop + $(".playlist").height();
    var elemTop = $activeItem.offset().top - $(".playlist").offset().top + containerTop;
    var elemBottom = elemTop + $activeItem.height();
    if (elemTop < containerTop) {
      $(".playlist").scrollTop(elemTop);
    } else if (elemBottom > containerBottom) {
      $(".playlist").scrollTop(elemBottom - $(".playlist").height());
    }
  }

  $(document).keydown(function(e) {
    switch (e.which) {
      case 38: // Up arrow key
        highlightPreviousSong();
        break;
      case 40: // Down arrow key
        highlightNextSong();
        break;
      case 13: // Enter key
        selectHighlightedSong();
        break;
      default:
        return; // Exit this handler for other keys
    }
    e.preventDefault(); // Prevent the default action (scrolling) from occurring
  });

  function selectHighlightedSong() {
    var $activeItem = $(".playlist li.active");
    var index = $activeItem.index();
    currentIndex = index;
    loadSong();

    // Toggle play/pause if the song is already playing
    if (isPlaying && audio.src.includes(songs[currentIndex])) {
      togglePlayPause();
    } else {
      playSong();
      var currentSong = songs[currentIndex];
      increasePlayCount(currentSong);
    }
  }

  function hidePreloader() {
    $("#preloader").fadeOut(500, function() {
      $(this).remove();
    });
  }

  // Set preloader timer
  var preloaderTimer = setTimeout(hidePreloader, 1000);

  loadPlaylist();
  loadSong();
});
