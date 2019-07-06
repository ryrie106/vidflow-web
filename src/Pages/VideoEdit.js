import React, { Component } from 'react';
import { Range } from 'antd-mobile';
import FFMPEG from '../components/VideoEdit/ffmpeg_runner';
import './VideoEdit.css';

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
    }

    componentDidMount() {
        this.setState({
            ffmpeg: new FFMPEG(),
            // heap_limit: performance.memory.jsHeapSizeLimit
            heap_limit: 0
        });
    }

    onLoadedMetadata = () => {
        // TODO: Range의 범위를 지정한다.
    }

    onLoadedData = (e) => {
        e.target.play();
    }

    // 
    update = () => {
        const currentTime = this.videoRef.current.currentTime;
        if (currentTime < this.state.time_start || currentTime > this.state.time_end)
            this.videoRef.current.currentTime = this.state.time_start;
        let complete_percent = 100 * (this.videoRef.current.currentTime / this.videoRef.current.duration);
        // TODO: 현재 포지션 변경하기
        // requestAnimationFrame(update.bind(this)); // Tell browser to trigger this method again, next animation frame.
    }

    // 영상 시작/중지 토글
    togglePlay = () => {
        console.log('toggle play');
        if(this.videoRef.current.paused){
            this.videoRef.current.play();
        }else{
            this.videoRef.current.pause();
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

    // 현재 설정을 바탕으로 FFMPEG 커멘드를 생성
    build_ffmpeg_string = (for_browser_run=false) => {
        let ts = (this.state.time_start?this.state.time_start.toFixed(2):0);
        let te = (this.state.time_end?this.state.time_end.toFixed(2):0);
        let mpeg = for_browser_run?'': 'ffmpeg ';
        mpeg+= '-ss '+ts+' -i "'+this.state.filename+'"';
        if(for_browser_run) {
            mpeg+=' -vf showinfo'
        }
        mpeg+=' -movflags faststart -t '+(te-ts).toFixed(4)+' ';
        let fn = for_browser_run ? encodeURI(this.state.filename.replace(/\.[^/.]+$/, "")) : 'out';
        mpeg+='-c:a copy '+fn+'.mp4';
        return mpeg;
    }

    // '다음' 버튼을 눌렀을 때. FFMPEG 커멘드를 실행한다.
    runFFMPEG = () => {
        if(this.state.heap_limit && 
            this.state.selected_file.size * 2.5 > (this.state.heap_limit - performance.memory.usedJSHeapSize)) {
                console.log("over heap size limit");
                return;
        }
        let cmd = this.build_ffmpeg_string(true);
        let time_start = (this.state.time_start?this.state.time_start.toFixed(2):0);
		let time_end = (this.state.time_end?this.state.time_end.toFixed(2):0);
		let duration = time_end - time_start;
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

    // 비디오 파일을 탐색기에서 선택하면 호출
    onChangeVideoSelector = (e) => {
        let fileInput = e.target;
		let fileUrl = window.URL.createObjectURL(fileInput.files[0]);
		this.setState({
            filename: fileInput.files[0].name,
            selected_file: fileInput.files[0]
        });
        this.videoRef.current.src = fileUrl;
		e.target.remove();
    }

    //
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
			this.videoRef.current.currentTime = this.videoRef.current.duration * total_percent
		}
		document.onmousemove = (e)=>{mmov(e, ele)};
		document.onmouseup = (e)=>{mup(e, ele)};
    }


    render() {
        return (
            <div>
                <video className="video-preview" 
                    loop 
                    onLoadedMetadata={this.onLoadedMetadata}
                    onLoadedData={this.onLoadedData}
                    onClick={this.togglePlay}
                    ref={this.videoRef} />
                <input type="file" id="video_selector" accept="video/*" onChange={this.onChangeVideoSelector}/>
                <div className="hide_until_load hidden">
                    <Range
                        min={0}
                        max={20}
                        defaultValue={[3, 10]}
                        onChange={this.onRangeChange}>
                        <div className="slider_time_pos" onMouseDown={this.onSliderTimeMouseDown} />
                    </Range>
                    <input type="button" id="run_ffmpeg" value="Run FFmpeg in-browser!" onClick={this.runFFMPEG}/>
                    <div className="download_links">

                    </div>
                </div>
            </div>
        );
    }
}

export default VideoEdit;