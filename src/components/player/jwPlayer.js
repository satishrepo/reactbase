import React, { Fragment, useEffect, useState } from 'react'
import playList from './playlist.json'
import ReactJWPlayer from 'react-jw-player'
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import parse from "html-react-parser";
// import LoaderComponent from "../../common/loaderComponent";
// import { baseURL } from "../../common/appURL";
// import network from "../../assets/network.svg";
// import SnackbarContentWrapper from "../Common/snackbarComponent";
// import Snackbar from "@material-ui/core/Snackbar";
// import { timeInSeconds } from "../../common/const";

const JWPlayer = (props) => {
    const [videoLink, setVideoLink] = useState(playList)
    const [isPalying, setIsPalying] = useState(true);
    const [compeleteVideo, setCompeleteVideo] = useState(false);

    const [chapters, setChapters] = useState([]);
    const [captions, setCaptions] = useState([]);
    const [caption, setCaption] = useState(-1);
    const [matches, setMatches] = useState([]);
    const [query, setQuery] = useState("");
    const [cycle, setCycle] = useState(-1);
    const [html, setHtml] = useState("")
    
    useEffect(() => {
        setVideoLink(playList)

        loadChapters()
    }, [])


    const loadChapters = () => {
        // Load chapters / captions
       
        Promise.all([
            new Promise((resolve) => fetch('../../assets/captions.vtt').then(r => r.text()).then(t => resolve(t))),
            new Promise((resolve) => fetch('../../assets/chapters.vtt').then(r => r.text()).then(t => resolve(t))),
        ])
        .then(textData => textData.map(t => t.split('\n\r\n').splice(1).map(s => parse(s))))
        .then(parsedData => {
            console.log('kkk', parsedData[0])
            setCaptions(parsedData[0])
            setChapters(parsedData[1])
            // loadCaptions();
        });
    }

    useEffect(() =>{
        console.log('effect captions')
        loadCaptions();
    },[captions, chapters])

    useEffect(() =>{
        console.log('effect captions')
        appendContent();
    },[html])

    const loadCaptions = () => {
        var h = "<p>";
        var section = 0;
        // console.log('captions', captions, chapters)
        captions.forEach((caption, i) => {
          if (section < chapters.length && caption.begin > chapters[section].begin) {
            h += "</p><h4>"+chapters[section].text+"</h4><p>";
            section++;
          }
          h += `<span id="caption${i}">${caption.text}</span>`;
        });
        let ht = html
        ht += h+"</p>";
        setHtml(ht)
    }

    const parse = (d) => {
        let a = d.split('\n');
        let i = a[1].indexOf(' --> ');
        let t = a[2];
        if (a[3]) {  t += " " + a[3]; }
        t = t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return {
          begin: seconds(a[1].substr(0,i)),
          btext: a[1].substr(3,i-7),
          end: seconds(a[1].substr(i+5)),
          text: t
        }
    }

    const seconds = (s) => {
        var a = s.split(':');
        var r = Number(a[a.length - 1]) + Number(a[a.length - 2]) * 60;
        if (a.length > 2) {
          r += Number(a[a.length - 3]) * 3600;
        }
        return r;
    }
      
    const onProgress = (e) => {
        var p = e.position;
        for(let j = 0; j<captions.length; j++) {
            if(captions[j].begin < p && captions[j].end > p) {
            if(j !== caption) {
                var c = document.getElementById(`caption${j}`);
                var transcript = document.getElementById(`transcript`);
                console.log('c', c)
                if(caption > -1) {
                    document.getElementById(`caption${caption}`).className = "";
                }
                c.className = "current";
                if(query === "") {
                    transcript.scrollTop = c.offsetTop - transcript.offsetTop - 40;
                }
                // caption = j;
                setCaption(j)
            }
            break;
            }
        }
    }
  


    const onComplete = (e) => {
      
    }

    const videoLoad = (e) => {
        setIsPalying(isPalying => true)
    }

    const onPause = (e) => {
        setIsPalying(isPalying => false)
        // clearInterval(timer)
    }

    const onResume = (e) => {
        setIsPalying(isPalying => true)
    }

    const onSeek = (e) => {
        // let data = {
        //     courseId: props.courseId,
        //     assetId: props.assetsId,
        //     timeSpent: Math.round(e.offset),
        //     courseStatus: "incomplete"
        // };
        // props.updateAccessedTime(data)
    }

    const appendContent = () => {
        return {__html: html};
    }

    return (
        <Fragment>
            <div className="player-container">
                    <div id="player">
                        <ReactJWPlayer
                            playerId='my-unique-id'
                            playerScript='https://content.jwplatform.com/libraries/jvJ1Gu3c.js'
                            playlist={videoLink}
                            isAutoPlay={true}
                            onVideoLoad={(e) => videoLoad(e)}
                            onTime={(e) => onProgress(e)}
                            onPause={(e) => onPause(e)}
                            onResume={(e) => onResume(e)}
                            onComplete={(e) => onComplete(e)}
                            onSeek={(e) => onSeek(e)}
                            />
                    </div>
                    <div className="sidebar">
                        <div id="searchbox" className="searchbox">
                            <span id="match" className="match">0 of 0</span>
                            <input id="search" type="search" className="search" />
                        </div>
                        <div id="transcript" className="transcript" dangerouslySetInnerHTML={appendContent()}></div>
                    </div>
                </div>
                    
        </Fragment>
    )
}

export default JWPlayer