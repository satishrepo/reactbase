import React, { Fragment, useEffect, useState } from 'react'
import playList from './playlist.json'
import ReactJWPlayer from 'react-jw-player'
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Switch from '@material-ui/core/Switch';


const Input = (props) => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        props.onSearch(event)
      }
    }
  
    return <input id="search" type="search" className="search" onKeyDown={handleKeyDown} />
}

const Template = (props) => {
    return <div 
            style={{fontSize: props.fontSize}}
            id="transcript" 
            className="transcript" 
            dangerouslySetInnerHTML={{__html: props.html}} />
}

const JWPlayer = (props) => {
    const [videoLink, setVideoLink] = useState([])
    

    const [chapters, setChapters] = useState([]);
    const [captions, setCaptions] = useState([]);
    const [caption, setCaption] = useState(-1);
    const [matches, setMatches] = useState([]);
    const [query, setQuery] = useState("");
    const [cycle, setCycle] = useState(-1);
    const [html, setHtml] = useState("")
    const [searchText, setSearchText] = useState('')
    const [syncScript, setSyncScript] = useState(true)
    const [syncScriptFontSize, setSyncScriptFontSize] = useState(10)
    
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
            // console.log('kkk', parsedData[0])
            setCaptions(parsedData[0])
            setChapters(parsedData[1])
            // loadCaptions();

        });
    }

    useEffect(() => {
        loadCaptions();
    },[captions, chapters])

    useEffect(() => {
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
        if (!syncScript) {
            return 
        }
        var p = e.position;
        for(let j = 0; j<captions.length; j++) {
            if(captions[j].begin < p && captions[j].end > p) {
            if(j !== caption) {
                var c = document.getElementById(`caption${j}`);
                var transcript = document.getElementById(`transcript`);
                // console.log('c', c)
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
  


    const videoLoad = (e) => {
        let transcript = document.getElementById('transcript')
        transcript.addEventListener('click', function(e) {
            if (e.target.id.indexOf('caption') === 0) {
                let i = Number(e.target.id.replace('caption', ''));
                if (captions.length && captions[i] && captions[i].begin) {
                    onSeek(captions[i].begin);
                }
            }
        });
    }


    const onSeek = (e) => { 
        // console.log(window.jwplayer())
        window.jwplayer().seek(e)
    }

    const appendContent = () => {
        return {__html: html};
    }


    const sanitizeRegex = q => {
        return q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    const onSearch = (e) => {
        let q = e.target.value.toLowerCase();
        if (q.length) {
            console.log('query', query, 'cycle', cycle)
            if (q === query) {
                let thisCycle;
                if (e.shiftKey) {
                    thisCycle = cycle <= 0 ? (matches.length - 1) : (cycle - 1);
                } else {
                    thisCycle = (cycle >= matches.length - 1) ? 0 : (cycle + 1);
                }
                console.log('thisCycle', thisCycle);
                cycleSearch(thisCycle);
                return;
            }
            resetSearch();
            searchTranscript(q);
            return;
        }
        resetSearch();
    }

    useEffect( () => {
        if(matches.length) {
            cycleSearch(0)
        }
    }, [matches])

    const searchTranscript = (q) => {
        let newMatches = []
        setQuery(q)
        captions.forEach(({ text }, loc) => {
            let matchSpot = text.toLowerCase().indexOf(q);
            if (matchSpot > -1) {
                console.log(text, loc)
                const replacer = sanitizeRegex(q);
                document.getElementById(`caption${loc}`).innerHTML = text.replace(new RegExp(`(${replacer})`, 'gi'), `<em class="current">$1</em>`, );
                newMatches.push(loc)
            }
        });
        setMatches(newMatches)
        // if(matches.length) {
        //   cycleSearch(0);
        // } 
        // else {
        //   resetSearch();
        // }
    }

    const cycleSearch =(i) => {
        let match = document.getElementById('match');
        let transcript = document.getElementById('transcript');
        
        console.log('cycleSearch', i, matches[i])
        if (cycle > -1) {
            let o = document.getElementById(`caption${matches[cycle]}`);
            o.querySelector('em').className = '';
        }
        
        // console.log('matches[i]', matches[i]);
        if (matches[i]) {
            const c = document.getElementById(`caption${~~matches[i]}`);    
            c.querySelector('em').className = 'current';
            match.textContent = `${i + 1} of ${matches.length}`;
            transcript.scrollTop = c.offsetTop - transcript.offsetTop - 40;
            // cycle = i;
            setCycle(i)
        }

    }

    const resetSearch = () => {
        if (matches.length) {
          captions.forEach((caption, i) => {
            document.getElementById(`caption${~~i}`).textContent = caption.text;
          });
        }
        
        setQuery('')
        setMatches([])
        setCycle(-1)
        // transcript.scrollTop = 0;
    }

    const toggleSyncScript = () => {
        setSyncScript(!syncScript)
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
                            // onPause={(e) => onPause(e)}
                            // onResume={(e) => onResume(e)}
                            // onComplete={(e) => onComplete(e)}
                            // onSeek={(e) => onSeek(e)}
                            />
                    </div>
                    <div className="sidebar">
                        <div id="searchbox" className="searchbox">
                            <span id="match" className="match">0 of {matches.length}</span>
                            <Input onSearch={onSearch}/>
                        </div>
                        <div className="sync-script-toggle-bar">
                            <div>Sync Typescript</div>
                            <div className="font-size">
                                <span className="small" onClick={() => setSyncScriptFontSize(10)}>A</span>
                                <span className="medium" onClick={() => setSyncScriptFontSize(14)}>A</span>
                                <span className="large" onClick={() => setSyncScriptFontSize(17)}>A</span>
                            </div>
                            <div>
                                <Switch
                                    checked={syncScript}
                                    onChange={toggleSyncScript}
                                    name="synScript"
                                    color="primary"
                                    // inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            </div>

                        </div>
                        {/* <div id="transcript" className="transcript" dangerouslySetInnerHTML={appendContent()}></div> */}
                        <Template html={html} fontSize={syncScriptFontSize} />
                    </div>
                </div>
                    
        </Fragment>
    )
}

export default JWPlayer