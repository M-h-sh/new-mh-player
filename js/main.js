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
}

$(document).ready(function() {
	var songs = [
		"Bruce_Africa_-_You",
		"de-mthuda-da-muziqal-chef-eemoh-sgudi-snyc-ft-sipho-magudulela",
		"Tebza_De_DJ_ft_DJ_Nomza_The_King_-_Ka_Valungu_Remix",
		"Umjabulisi  Vuma Original Audio",
		"Anga Nilavi Amapiano feat Tebza De DJ",
		"Focalistic EeQue  Thama Tee  Khekheleza Dlala Dlala Official Visualizer",
		"Tyler ICU  Tumela ZA  Mnike Official Audio feat DJ MaphorisaNandipha808 Ceeka RSA  Tyron Dee",
		"Casswell P  Master KG  Mangihlale Feat Lwami Official Audio",
		"Wanitwa MosMaster KG  Seemah  Thando Feat Lowsheen Official Audio",
		"Malume Nta Swi Byela Mani Revisit",
		"Sam Deep Eemoh  iMpumelelo Visualizer ft Da Muziqal Chef",
		"Kunkra",
		"Ka Gaza feat DJ Nomza The King",
		"major-keys-forever-yena",
		"SUKA feat Nandipha808 Ceeka RSA",
		"Myztro Ah Ah",
		"Swa Ku Lungha feat Tebza De DJ",
		"Lufuno"
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


	// Function to apply the selected theme
	// JavaScript
	const themeToggle = document.getElementById('theme-toggle');
	const sunIcon = document.querySelector('.fa-sun');
	const moonIcon = document.querySelector('.fa-moon');
	const activeTab = document.querySelector('.active-tab');

	function applyTheme(themeName) {
		if (themeName === 'theme1') {
			// Light mode
			$("#player").removeClass("bg-dark").addClass("bg-light");
			$("#all").removeClass("bg-secondary").addClass("bg-white");
			sunIcon.style.display = 'none';
			moonIcon.style.display = 'inline-block';
		} else if (themeName === 'theme2') {
			// Dark mode
			$("#player").removeClass("bg-light").addClass("bg-dark");
			$("#all").removeClass("bg-white").addClass("bg-secondary");

			sunIcon.style.display = 'inline-block';
			moonIcon.style.display = 'none';
		}
		if (themeName === 'theme1') {
			// Light mode
			activeTab.classList.remove('active-tab');
			sunIcon.style.display = 'none';
			moonIcon.style.display = 'inline-block';
		} else if (themeName === 'theme2') {
			// Dark mode
			activeTab.classList.remove('active-tab');
			sunIcon.style.display = 'inline-block';
			moonIcon.style.display = 'none';
		}
	}


	function setTheme(event) {

		const selectedTheme = event.target.checked ? 'theme2' : 'theme1';
		applyTheme(selectedTheme);
	}

	themeToggle.addEventListener('change', setTheme);

	// Load the default theme (light mode) on page load
	applyTheme('theme1');


	// Function to download the current song
	function downloadSong() {
		var downloadLink = document.createElement("a");
		downloadLink.href = "files/" + songs[currentIndex] + ".mp3";
		downloadLink.download = songs[currentIndex] + ".mp3";
		downloadLink.click();
	}

	$("#download").click(function() {
		downloadSong();
	});

	// Event handler for accordion title click
	$(".accordion-title").click(function() {
		var accordionContent = $(this).next(".accordion-content");
		if (accordionContent.is(":animated")) {
			return;
		}

		var wasPlaying = isPlaying;
		if (wasPlaying) {
			audio.play();
		}

		$(this).toggleClass("active");
		accordionContent.slideToggle(function() {
			isAccordionActive = accordionContent.is(":visible");
			if (isAccordionActive) {
				activePlaylist = accordionContent.find("ul");
				activeIndex = activePlaylist.find("li.active").index();
			}
		});
	});

	// Function to load the current song
	function loadSong() {
		var song = songs[currentIndex];
		var songUrl = "files/" + song + ".mp3";
		$("#song-title").text(song);
		$(".playlist li").removeClass("active");
		$(".playlist li:eq(" + currentIndex + ")").addClass("active");
		$(".accordion-content li").removeClass("active");
		$(".accordion-content li:eq(" + currentIndex + ")").addClass("active");

		audio.src = songUrl;
		audio.load(); // Load the audio

		// Show loading indicator
		$(".loading-indicator").show();
		// Hide error message
		$(".error-message").hide();

		// Event listener for successful audio loading
		audio.addEventListener("ended", function() {
			if (isRepeatCurrent) {
				// If repeat current song is enabled, replay the current song
				playSong();
			} else if (isRepeatAll) {
				// If repeat all songs is enabled, play the next song
				nextSong();
				playSong();
			} else if (!isShuffle) {
				// If shuffle is not enabled, play the next song
				nextSong();
				playSong();
			} else {
				// If shuffle is enabled, randomly select the next song
				currentIndex = Math.floor(Math.random() * songs.length);
				loadSong();
				playSong();
			}

			// Update the recently played playlist immediately after autoplaying next song
			updateRecentlyPlayedPlaylist();
		});

		// Event listener for error during audio loading
		audio.addEventListener("error", function() {
			$(".loading-indicator").hide();
			$(".error-message").show();
		});
	}

	// Event handler for play button click
	function playSong() {
		audio.play().then(function() {
			$("#play").html('<i class="fas fa-pause"></i>');
			isPlaying = true;
		}).catch(function(error) {
			// Handle play error
		});
	}

	// Event handler for pause button click
	function pauseSong() {
		audio.pause();
		$("#play").html('<i class="fas fa-play"></i>');
		isPlaying = false;
	}

	// Event handler for toggle play/pause button click
	function togglePlayPause() {
		if (isPlaying) {
			pauseSong();
		} else {
			playSong();
		}
	}

	// Event handler for next button click
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
	}

	// Event handler for previous button click
	function prevSong() {
		currentIndex--;
		if (currentIndex < 0) {
			currentIndex = songs.length - 1;
		}
		loadSong();
	}

	// Function to update the recently played songs
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

	// Function to update the recently played playlist
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
				increasePlayCount(song);
			});
			$(".recently-played-list").append(li);
		}
	}

	// Function to increase the play count for a song
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

	// Function to update the most played songs
	function updateMostPlayed() {
		var mostPlayed = JSON.parse(localStorage.getItem("mostPlayed")) || {};
		var sortedSongs = Object.keys(mostPlayed).sort(function(a, b) {
			return mostPlayed[b] - mostPlayed[a];
		});
		$(".most-played-list").empty();
		for (var i = 0; i < Math.min(sortedSongs.length, 3); i++) {
			var song = sortedSongs[i];
			var li = $("<li>").text(song + " (Played " + mostPlayed[song] + " Times)");
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

	// Function to load the playlist
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
				increasePlayCount(song);
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
				increasePlayCount(song);
			});
			$(".playlist").append(li);
		}
	}

	// Event handler for play button click
	$("#play").click(function() {
		togglePlayPause();
		var currentSong = songs[currentIndex];
		increasePlayCount(currentSong);
	});

	// Event handler for next button click
	$("#next").click(function() {
		nextSong();
		var currentSong = songs[currentIndex];
		increasePlayCount(currentSong);
	});

	// Event handler for previous button click
	$("#prev").click(function() {
		prevSong();
		var currentSong = songs[currentIndex];
		increasePlayCount(currentSong);
	});

	// Event handler for repeat all button click
	$("#repeat-all").click(function() {
		isRepeatAll = !isRepeatAll;
		$(this).toggleClass("active", isRepeatAll);
	});

	// Event handler for repeat current button click
	$("#repeat-current").click(function() {
		isRepeatCurrent = !isRepeatCurrent;
		$(this).toggleClass("active", isRepeatCurrent);
	});

	// Event handler for shuffle button click
	$("#shuffle").click(function() {
		isShuffle = !isShuffle;
		$(this).toggleClass("active", isShuffle);
	});

	// Event handler for volume input change
	$("#volume").on("input", function() {
		var volume = $(this).val();
		audio.volume = volume;
	});

	// Function to update the progress bar
	function updateProgressBar() {
		var currentTime = audio.currentTime;
		var duration = audio.duration;
		var progressPercentage = (currentTime / duration) * 100;
		$("#progress").css("width", progressPercentage + "%");
		updateTimer(currentTime, duration);
	}

	// Function to update the timer display
	function updateTimer(currentTime, duration) {
		var currentMinutes = Math.floor(currentTime / 60);
		var currentSeconds = Math.floor(currentTime % 60);
		var durationMinutes = Math.floor(duration / 60);
		var durationSeconds = Math.floor(duration % 60);
		$("#timer").text(
			currentMinutes + ":" + formatTime(currentSeconds) + " / " + durationMinutes + ":" + formatTime(durationSeconds)
		);
	}

	// Function to format time with leading zeros
	function formatTime(time) {
		return time < 10 ? "0" + time : time;
	}

	// Function to seek the song by clicking on the timer
	function seekSong(event) {
		var timerWidth = $("#timer").width();
		var clickX = event.pageX - $(this).offset().left;
		var percent = clickX / timerWidth;
		var seekTime = audio.duration * percent;
		audio.currentTime = seekTime;
	}

	$("#timer").click(seekSong);

	// Event listener for time update of the song
	audio.addEventListener("timeupdate", function() {
		updateProgressBar();
	});

	// Function to search songs
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

	// Event handler for search input change
	$("#search-input").on("input", function() {
		var searchTerm = $(this).val();
		searchSongs(searchTerm);
	});

	// Function to highlight the previous song in the playlist
	function highlightPreviousSong() {
		var $currentItem = $(".playlist li.active");
		var $prevItem = $currentItem.prev();
		if ($prevItem.length > 0) {
			$currentItem.removeClass("active");
			$prevItem.addClass("active");
			scrollToActiveItem();
		}
	}

	// Function to highlight the next song in the playlist
	function highlightNextSong() {
		var $currentItem = $(".playlist li.active");
		var $nextItem = $currentItem.next();
		if ($nextItem.length > 0) {
			$currentItem.removeClass("active");
			$nextItem.addClass("active");
			scrollToActiveItem();
		}
	}

	// Function to scroll to the active item in the playlist
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

	// Event listener for keydown events
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

	// Event listener for click on playlist items
	$(".playlist li").click(function() {
		currentIndex = $(this).index();
		loadSong();
		playSong();
		var currentSong = songs[currentIndex];
		increasePlayCount(currentSong);
	});

	 // Function to hide the preloader
  function hidePreloader() {
    $("#preloader").fadeOut(500, function() {
      $(this).remove();
    });
  }

  // Set preloader timer
  var preloaderTimer = setTimeout(hidePreloader, 1000);
	loadPlaylist();
	loadSong();
	updateRecentlyPlayed();
	updateMostPlayed();
});
