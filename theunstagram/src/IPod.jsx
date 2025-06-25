import { useState } from 'react';
import './App.css';
import './IPod.css';
import cover from './assets/vozmememos.jpg'
import pause from './assets/pause-play.png'
import forward from './assets/forward.png'

// <div> Icons made by <a href="https://www.flaticon.com/authors/andreas666" title="Andreas666"> Andreas666 </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>

function IPod({episodes}) 

{
    const [number, changeNumber] = useState(0)
    console.log(episodes[0].title.rendered)

    return (
        <div className='iPod'>
            <div className='iPodScreen'>
                <div className='screenContent'>
                    <img src={cover} alt="Angela sitting on bed with microphone. Text reads Voz Memos A Gen-Z Podcast" className='cover' />
                </div>
               <div className='screenContent'>
               {episodes[0] && (
                <a href={episodes[0].link}>
                    <p dangerouslySetInnerHTML={{ __html: episodes[0].title.rendered }} />
                </a>
                )}
                </div>
            </div>
            <div className='iPodScroll'>
                <div className='scrollRow1'>
                    <h3>menu</h3>
                </div>
                <div className='scrollRow2'>
                        <img width="32px" height="32px" src={forward} alt="end" style={{transform: "rotate(180deg)"}}/>                
                    <div className='scrollButton'></div>
                        <img width="32px" height="32px" src={forward} alt="end"/>                
                    </div>
                <div className='scrollRow3'>
                    <img src={pause} width="32px" height="32px" style={{marginTop:"10px"}}/>
                </div>
            </div>
        </div>
    )
}

export default IPod