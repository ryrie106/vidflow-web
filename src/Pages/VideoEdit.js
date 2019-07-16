import React, { Component } from 'react';
import { Icon, NavBar, Button, Toast } from 'antd-mobile';
// import FFMPEG from '../components/VideoEdit/ffmpeg_runner';
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';
import './VideoEdit.css';

class VideoEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ffmpeg: null,
            // heapLimit: null,
            fileName: '',
            timeStart: 0,
            timeEnd: 1
        }
        this.videoRef = React.createRef();
        this.rangeRef = React.createRef();
        this.rangePositionRef = React.createRef();
    }

    componentDidMount() {
        this.setState({
            // ffmpeg: new FFMPEG(),
            // heapLimit: performance.memory.jsHeapSizeLimit
        });
        Toast.info("업로드할 영상을 선택하고 다음 버튼을 누르세요 아직 편집은 지원하지 않습니다.", 3);
        
    }

    onLoadedMetadata = () => {
        if(this.rangeRef.current.noUiSlider)
            this.rangeRef.current.noUiSlider.destroy();
        noUiSlider.create(this.rangeRef.current, {
            start: [0, this.videoRef.current.duration],
            connect: true,
            range : {
                'min' : 0,
                'max' : this.videoRef.current.duration
            }
        });
        this.rangeRef.current.noUiSlider.on('update', this.onRangeChange); 
    }

    onLoadedData = (e) => {
        e.target.play();
        this.update();
    }

    // 
    update = () => {
        if(this.videoRef.current) {
            const currentTime = this.videoRef.current.currentTime;
            if (currentTime < this.state.timeStart || currentTime > this.state.timeEnd)
                this.videoRef.current.currentTime = this.state.timeStart;
            let completePercent = 100 * (this.videoRef.current.currentTime / this.videoRef.current.duration);
            this.rangePositionRef.current.style.left = completePercent + "%";
            requestAnimationFrame(this.update.bind(this));
        }
    }

    // 영상 시작/중지 토글
    togglePlay = () => {
        if(this.videoRef.current.paused){
            this.videoRef.current.play();
        }else{
            this.videoRef.current.pause();
        }
    }

    onRangeChange = (range) => {
        if(!range || range.length < 2)
            return;
        this.setState({
            timeStart: parseFloat(range[0]),
            timeEnd: parseFloat(range[1])
        });
    }

    // 현재 설정을 바탕으로 FFMPEG 커멘드를 생성
    buildFfmpegString = (forBrowserRun=false) => {
        let ts = (this.state.timeStart?this.state.timeStart.toFixed(2):0);
        let te = (this.state.timeEnd?this.state.timeEnd.toFixed(2):0);
        let mpeg = forBrowserRun?'': 'ffmpeg ';
        mpeg+= '-ss '+ts+' -i "'+this.state.fileName+'"';
        if(forBrowserRun) {
            mpeg+=' -vf showinfo'
        }
        mpeg+=' -movflags faststart -t '+(te-ts).toFixed(4)+' ';
        let fn = forBrowserRun ? encodeURI(this.state.fileName.replace(/\.[^/.]+$/, "")) : 'out';
        mpeg+='-c:a copy '+fn+'.mp4';
        return mpeg;
    }

    // '다음' 버튼을 눌렀을 때. FFMPEG 커멘드를 실행한다.
    runFFMPEG = () => {
        // if(this.state.heapLimit && 
        //     this.state.selectedFile.size * 2.5 > (this.state.heapLimit - performance.memory.usedJSHeapSize)) {
        //         console.log("over heap size limit");
        //         return;
        // }
        let cmd = this.buildFfmpegString(true);
        let timeStart = (this.state.timeStart?this.state.timeStart.toFixed(2):0);
		let timeEnd = (this.state.timeEnd?this.state.timeEnd.toFixed(2):0);
		let duration = timeEnd - timeStart;
		let progressCallback = (prog) => {
			if(prog.done){
				console.log("Conversion complete.");
			}else {
				let percent = (prog['time'] / duration) * 100;
				console.log(percent.toFixed(2) + "% complete.");
			}
		};
		console.log('Running FFMPEG:', cmd);
		this.state.ffmpeg.start(this.state.selectedFile, cmd, progressCallback);
    }

    // 비디오 파일을 탐색기에서 선택하면 호출
    onChangeVideoSelector = (e) => {
        let fileInput = e.target;
		let fileUrl = window.URL.createObjectURL(fileInput.files[0]);
		this.setState({
            fileName: fileInput.files[0].name,
            // selectedFile: fileInput.files[0]
        });
        this.props.onChangeVideoSelector(fileInput.files[0]);
        this.videoRef.current.src = fileUrl;
        this.rangeRef.current.style.display = "block";
        
        
		// e.target.remove();
    }

    //
    onRangePositionMouseDown = (e) => {
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

    onClickNext = () => {
        if(this.state.fileName) {
            this.props.history.push("/write");
        }
    }


    render() {
        return (
            <div className="video-edit">
                <NavBar
                    className="video-edit-navbar"
                    icon={<Icon type="left" />}
                    mode="light"
                    onLeftClick={() => this.props.history.push("/")}
                    rightContent={[
                        <Button size="small" type="warning" onClick={this.onClickNext}>
                            다음
                        </Button>
                    ]}
                />
                <video className="video-edit-preview"
                    loop 
                    onLoadedMetadata={this.onLoadedMetadata}
                    onLoadedData={this.onLoadedData}
                    onClick={this.togglePlay}
                    ref={this.videoRef} />
                
                <div className="video-edit-selector">
                    <input type="file" accept="video/*" 
                    onChange={this.onChangeVideoSelector}/>
                </div>

                <div className="video-edit-preview-range" ref={this.rangeRef} >
                    <div className="video-edit-preview-range-position" 
                        onMouseDown={this.onRangePositionMouseDown}
                        ref={this.rangePositionRef}>

                    </div>
                </div>
            </div>
        );
    }
}

export default VideoEdit;