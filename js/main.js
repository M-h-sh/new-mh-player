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
        "Lufuno",
        "Thee Legacy ft Mnqobi Yao  Hlala Nami Official Music Video",
        "Harry Cane x Master KG  Dj LaTimmy  Dubula Official Audio",
        "Jay Music 2wobunnies Casablanca Official Audio ft Tremic Dah Rockstar Amapiano song",
        "Mawhoo Kabza De Small and DJ Maphorisa  Nduma Ndumane Feat Da Muziqal Chef Official Audio",
        "Felo Le Tee x Mellow  Sleazy  Midnight Prayer Official Audio  Amapiano feloleteeofficial",
        "Kabza De Small  Njelic  Nana Thula Remix feat Young Stunna  Nkosazana Daughter",
        "YB  JAY  NOKIA Quantum Sound Official Audio ft DjyloliRsa  Kat Roshqii BLZero  Lebzito",
        "Yes God Morda Thakzin Mhaw Keys Remix",
        "Gojasi",
        "Oscar Mbo KG Smallz and Kabza De Small  Yes God Feat Dearson Official Audio",
        "DJ Jaivane uLala Kanjani ft LeeMckrazy and Skandisoul Audio Visual",
        "Burna Boy  Big 7 Official Music Video",
        "Healer of the mind",
        "Shakespeare",
        "Peacock Amapiano Remix",
        "Uncle Waffles  Peacock Revisit ft Ice Beats Slide  Sbuda Maleather Official Video",
        "Jimmy Maradona Quayr Musiq Mellow  Sleazy  Wena Wa Pallwa Official Audio Ft Chcco Leemckrazy",
        "Makhadzi Entertainment  Movie Official Lyrics Video feat Ntate Stunna Fortunator  Dj Gun Do",
        "Ice Beats Slides x Sbuda Maleather  Qopetsa Ft Boi Bizza Official Audio",
        "Xowla-ft-Big-Zulu-DJ-Tira-Bengdakiwe",
        "Killorbeezbeatz_-_Ngilele_E_Hotel",
        "Mzokwana by Dj Tshegu, Focalistic, Sims Noreng",
        "Megadrumz-ft-Lady-Du-Tjina",
        "Yoh Ye Ye - Ice Beats Slide X Sbuda Maleather",
        "EL-Shep-Ft-Dr-Joe-Shirimani-Heke",
        "Thiba Thiba  DJ Sunco SA  Queen Jenny Official Audio",
        "Bao Jelasa feat Riri AJ  Hitboss",
        "Killorbeezbeatz  Wuuu Wuuu Official Audio",
        "Watcha Say Amapiano",
        "Dr Dope Hamba Wena ft Pro Tee Qveen Mzwilili  Kitso Nave Official Music Video",
        "Laela",
        "Sam Deep Njelic Aymos  Isgubhu Visualizer",
        "LINDOUGH FT FREDDIE GWALA, KINGSHORT & DJ ACTIVE ~OKSALAYO (Official Audio)",
        "MALI YAMINA EKWIN_ (feat. Khensani & Bongs Nwana Mhan)",
        "Kamo Mphela, Khalil Harrison & Tyler ICU - Dalie [Feat. Baby S.O.N] (Official Audio) - Amapiano", 
        "Nichralf Hustle Prayer", 
        "angelina revisit trechyson molly", 
        "HarryCane - Whistle Song (Official Audio)", 
        "King Khustah, GashBeats & Myy Gerald SA - Ndincedeni (Quantum Mix) [OFFICIAL AUDIO]",
        "Droatest ft. Lah'Vee - S'lala (Official Audio)"
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
    const sunIcon = document.getElementById('moon');
    const moonIcon = document.getElementById('sun');
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

            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
        if (themeName === 'theme1') {
            // Light mode
            activeTab.classList.remove('active-tab');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else if (themeName === 'theme2') {
            // Dark mode
            activeTab.classList.remove('active-tab');
            sunIcon.style.display = 'block';
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
        var totalCount = recentlyPlayed.length;
        $(".recently-played-total").text("Total: " + totalCount);

        for (var i = 0; i < recentlyPlayed.length; i++) {
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
                    increasePlayCount(song); // Update play count when song is clicked
                });
                $(".recently-played-list").append(li);
            }
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

        updateRecentlyPlayedPlaylist();
        updateMostPlayed();
    }


    // Function to update the most played songs
    function updateMostPlayed() {
        var mostPlayed = JSON.parse(localStorage.getItem("mostPlayed")) || {};
        var sortedSongs = Object.keys(mostPlayed).sort(function(a, b) {
            return mostPlayed[b] - mostPlayed[a];
        });
        $(".most-played-list").empty();
        var totalCount = sortedSongs.length;
        $(".most-played-total").text("Total: " + totalCount);

        for (var i = 0; i < Math.min(sortedSongs.length, 3); i++) {
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
    }

    // Function to load the playlist
    function loadPlaylist() {
        // Clear the existing playlist
        var totalCount = songs.length;
        $(".all-songs-total").text("Total Songs(" + totalCount + ")");

        for (var i = 0; i < songs.length; i++) {
            $(".playlist").empty();

            // Load the default playlist
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
    }
    // Function to load the next song
    function loadNextSong() {
        currentIndex++;
        if (currentIndex >= songs.length) {
            // If repeat all is enabled, go back to the first song
            if (isRepeatAll) {
                currentIndex = 0;
            } else {
                // If shuffle is enabled, randomly select the next song
                if (isShuffle) {
                    // Ensure the current song is not randomized (exclude from the shuffle)
                    var shuffledIndexes = Array.from({
                        length: songs.length
                    }, (_, i) => i);
                    shuffledIndexes.splice(currentIndex, 1);
                    currentIndex = shuffledIndexes[Math.floor(Math.random() * shuffledIndexes.length)];
                } else {
                    // If not shuffling and not repeating, stop the playback
                    pauseSong();
                    return;
                }
            }
        } else if (currentIndex < 0) {
            currentIndex = songs.length - 1;
        }

        loadSong();
        playSong();
    }




    // Event listener for ended event of the audio (current song ends)
    audio.addEventListener("ended", function() {
        loadNextSong();

        // Update the recently played playlist immediately after autoplaying next song
        updateRecentlyPlayedPlaylist();
    });

    // Event handler for play button click
    $("#play").click(function() {
        togglePlayPause();
        var currentSong = songs[currentIndex];
        increasePlayCount(currentSong);
    });

    // Event handler for next button click
    $("#next").click(function() {
        loadNextSong();
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

    function playHighlightedSong() {
        var $activeItem = $(".playlist li.active");
        currentIndex = $activeItem.index();
        loadSong();
        playSong();
    }
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
                playHighlightedSong();
                break;
            case 32: // Spacebar key (for toggling play/pause)
                togglePlayPause();
                break;
            case 39: // Right arrow key
                loadNextSong();
                var currentSong = songs[currentIndex];
                increasePlayCount(currentSong);
                break;
            case 37: // Left arrow key
                prevSong();
                var currentSong = songs[currentIndex];
                increasePlayCount(currentSong);
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
