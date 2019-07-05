let video = document.querySelector(".video");
const canvas = document.getElementById("canv");
const ctx = canvas.getContext("2d");
let slider = document.getElementById('slider');

let video_size = {'w': 0, 'h': 0};
let filename = 'in.mp4';
let time_start = 0;
let time_end = 1;
let ffmpeg = null;
let selected_file = null;
let heap_limit = null;

$(function() {
	console.log('Loaded DOM.');
	ffmpeg = new FFMPEG(document.querySelector(".download_links"));
	try{
		heap_limit = performance.memory.jsHeapSizeLimit;
		console.debug("Heap limit found:", heap_limit)
	}catch{}


	$(".video").bind("loadedmetadata", function (e) {
		video_size = {'w': this.videoWidth, 'h': this.videoHeight};
		$('.hide_until_load').removeClass('hidden');
		noUiSlider.create(slider, {
			start: [0, this.duration],
			connect: true,
			range: {
				'min': 0,
				'max': this.duration
			}
		});
		slider.noUiSlider.on('update', (range)=>{
			update_slider_fields(range);
		});
		update_slider_fields();
	}).bind('loadeddata', function(e) {
		// noinspection JSIgnoredPromiseFromCall
		e.target.play();  // start playing
	}).on('pause', (e)=>{
		console.log('Paused: ', e.target.currentTime)
	});

	$('.slider_control').on('change', (e)=>{
		set_slider();
	});


});


