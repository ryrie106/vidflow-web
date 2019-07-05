import React, { Component } from 'react';
import FFMPEG from '../components/Write/videoedit/ffmpeg_runner';

class VideoEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ffmpeg: null,
            heap_limit: null,
            selected_file: null,
            fileName: '',
            time_start: 0,
            time_end: 1
        }
        this.videoRef = React.createRef();
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        this.setState({
            ffmpeg: new FFMPEG(),
            heap_limit: performance.memory.jsHeapSizeLimit
        });

    }

    update(){
        /* width height update 제거 */
        if (this.videoRef.currentTime < this.state.time_start)
            video.currentTime = this.state.time_start;
        if (video.currentTime > this.state.time_end)
            video.currentTime = this.state.time_start;
        let complete_percent = 100 * (video.currentTime / video.duration);
        $(".slider_time_pos").css("left", complete_percent + "%");
        $(".current_time").text(video.currentTime.toFixed(2));
        // noinspection JSCheckFunctionSignatures
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height); //TODO: Subimage using crop.
    
        let mpeg = build_ffmpeg_string(false);
        if($('.ffmpeg').text() !== mpeg) {
            $('.ffmpeg').text(mpeg);
        }
        requestAnimationFrame(update.bind(this)); // Tell browser to trigger this method again, next animation frame.
    }

    pause_toggle = () => {
        console.log('toggle play');
        if(video.paused){
            video.play().finally(()=>{$(".play_toggle").html('&#10074;&#10074;')});
        }else{
            video.pause();
            $(".play_toggle").html('&#9654;')
        }
    }

    update_slider_fields = (range) => {
        if(!range || range.length < 2)
            return;
        document.querySelectorAll('.slider_control').forEach(function(input) {
            // noinspection JSUndefinedPropertyAssignment
            input.value = range[input.dataset.pos];
        });
        this.setState({
            time_start: parseFloat(range[0]),
            time_end: parseFloat(range[1])
        });
    }

    build_ffmpeg_string = (for_browser_run=false) => {
        let ts = (this.state.time_start?this.state.time_start.toFixed(2):0);
        let te = (this.state.time_end?this.state.time_end.toFixed(2):0);
        let mpeg = for_browser_run?'': 'ffmpeg ';
        mpeg+= '-ss '+ts+' -i "'+this.state.filename+'"';
        if(for_browser_run) {
            mpeg+=' -vf showinfo'
        }
        mpeg+=' -movflags faststart -t '+(te-ts).toFixed(4)+' ';
        // crop 제거
        let fn = for_browser_run ? encodeURI(this.state.filename.replace(/\.[^/.]+$/, "")) : 'out';
        mpeg+='-c:a copy '+fn+'.mp4';
        return mpeg;
    }

    

    runFFMPEG = () => {
        if(this.state.heap_limit && 
            this.state.selected_file.size * 2.5 > (this.state.heap_limit - performance.memory.usedJSHeapSize)) {
                console.log("over heap size limit");
                return;
        }
        let cmd = this.build_ffmpeg_string(true);
        let ts = (this.state.time_start?this.state.time_start.toFixed(2):0);
		let te = (this.state.time_end?this.state.time_end.toFixed(2):0);
		let duration = te - ts;
		let progress_callback = (prog) => {
			if(prog.done){
				console.log("Conversion complete.");
			}else {
				let percent = (prog['time'] / duration) * 100;
				console.log(percent.toFixed(2) + "% complete.");
			}
		};
		console.log('Running FFMPEG:', cmd);
		this.state.ffmpeg.start(this.state.selected_file, cmd, progress_callback);
    }

    onChangeVideoSelector = (e) => {
        let fileInput = e.target;
		let fileUrl = window.URL.createObjectURL(fileInput.files[0]);
		this.setState({
            filename: fileInput.files[0].name,
            selected_file: fileInput.files[0]
        });
		$(".video").attr("src", fileUrl);
		e.target.remove();
    }

    onSliderTimeMouseDown = (e) => {
        let ele = e.target;
		let last_pos = e.clientX;
		function mup(e, ele){
			console.log('up');
			document.onmousemove = null;
			document.onmouseup = null;
		}
		function mmov(e, ele){
			let delta = e.clientX - last_pos;
			console.log('Delta:', delta);
			last_pos = e.clientX;
			let total_percent = (ele.offsetLeft+delta)/ele.parentElement.offsetWidth;
			console.log(total_percent);
			video.currentTime = video.duration * total_percent
		}
		document.onmousemove = (e)=>{mmov(e, ele)};
		document.onmouseup = (e)=>{mup(e, ele)};
    }


    render() {
        return (
            <div>
                <div class="ui-widget-content" onClick="pause_toggle()">
                    <video class="video" loop ref={this.videoRef}></video>
                    <canvas id="canv" ref={this.canvasRef}></canvas>
                </div>
                <input type="file" id="video_selector" accept="video/*"/>
                <div class="hide_until_load hidden">
                    <div class="slider_wrapper">
                        <div id="slider"></div>
                        <div class="slider_time_pos" onMouseDown={this.onSliderTimeMouseDown}></div>
                    </div>
                    <div class="ffmpeg">
                        ffmpeg -i in.mp4 -filter:v "crop=80:60:200:100" -c:a copy out.mp4
                    </div>

                    <input type="button" id="run_ffmpeg" value="Run FFmpeg in-browser!" onClick={this.runFFMPEG}/>

                    <div class="download_links">

                    </div>
                </div>
            </div>
        );
    }
}

export default VideoEdit;