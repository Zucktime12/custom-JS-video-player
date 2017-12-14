// get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]'); // asks to look for anything with a data-skip element
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

// build out functions
function togglePlay() {
	//paused is a property that lives on the .video
	// if (video.paused) {
	// 	video.play();
	// } else {
	// 	video.pause();
	// }
	//Terinary method below, same function as above code
	const method = video.paused ? 'play' : 'pause';
	video[method]();
} 

function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
	console.log('Update Button');
}

function skip() {
	// console.log('skipping');
	// console.log(this.dataset.skip)
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	video[this.name] =  this.value;
	// console.log(this.name);
	// console.log(this.value );
}

function handleProgress() {
	const percent =  (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
	const scrubTime = (e.offsetX /  progress.offsetWidth) * video.duration;
	// console.log(e);
	video.currentTime = scrubTime;
}

function toggleFullScreen() {
	// console.log("toggling fullscreen mode");
	if(video.requestFullScreen){
		video.requestFullScreen();
	} else if(video.webkitRequestFullScreen){
		video.webkitRequestFullScreen();
	} else if(video.mozRequestFullScreen){
		video.mozRequestFullScreen();
	}
}

// hook up event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);


toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false; //flag variable so that video only changes on mouse move when user has mouse clicked down.
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); // same code as below. && operator says if first variable is true (mousedown) then 
// progress.addEventListener('mousemove', () => {
// 	if (mousedown) {
// 		scrub(); 
// 	}
// });
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = true);

fullscreen.addEventListener('click', toggleFullScreen);



