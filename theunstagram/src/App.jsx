import './App.css'
import IPod from './IPod';
import Blog from './Blog';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import { useEffect } from 'react';
import { useState } from 'react';
import kodak from './assets/kodak.png';
import sunset from './assets/sunset.gif';
import dolphin from './assets/dolphin.gif';
import hibiscus from './assets/hibiscus.png';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import agbw from './assets/bw.png';

// Top-level glob import (runs at build time)
const imageModules = import.meta.glob('./assets/june/*.{jpg,jpeg,png,svg,JPG,JPEG,PNG,SVG}', {
  eager: true,
});

// Extract the default exports (the URLs)
const images = Object.values(imageModules).map((mod) => mod.default);

function App() {



const [posts, setPosts] = useState()

const [episodes, setEpisodes] = useState()

useEffect(() => {
  fetch('https://angelageorge.com/wp-json/wp/v2/posts?categories=53&per_page=5')
    .then(res => res.json())
    .then((postsData) => {
      setPosts(postsData)
    })
    .catch(err => console.error('Error fetching posts:', err));


    
  fetch('https://angelageorge.com/wp-json/wp/v2/podcast?per_page=5')
    .then(res => res.json())
    .then((episodeData) => {
      setEpisodes(episodeData)
    })
    .catch(err => console.error('Error fetching episodes:', err));


  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    
    
      <Container fluid className='p-0'>
        <Row>
          <Col>
            <h1 style={{textAlign:"center"}}>
              <img src={hibiscus} alt="pixel art hibiscus" width="50px" style={{marginRight:"10px"}}/>
              Welcome to The Unstagram
              <img src={hibiscus} alt="pixel art hibiscus" width="50px" style={{marginLeft:"5px"}}/>
            </h1>
          </Col>
        </Row>
        <Row>
          <Col lg={3} md={3}>
          <div className='menu'>
            <h2>Menu</h2>
            <p onClick={handleShow}>About Me</p>
            <p>Kodak Easyshare Z1485 IS</p>
            <p>Zines</p>
            <p>Poems</p>
          </div>
          </Col> 
          <Col  lg={6} md={4} >
          {/* Image Carousel */}
          <Row className='text-center'>
            <div className='camera'>
          <Carousel className='imageGallery' controls={false} fade>
            {/* Mapping images */}
              {images.map((src, idx) => (
                <Carousel.Item key={idx}>
                  <img 
                    src={src} 
                    width="280px" 
                    height="210px"
                    alt={`Gallery image ${idx + 1}`}
                    />
                </Carousel.Item>
              ))}
          </Carousel>
            <img src={kodak} alt="kodak easyshare pink background" width="450px" style={{zIndex:"1"}}/>
          </div>
          </Row>
          <Row>
            <Col style={{color:"white"}}>
          <h2>Manifesto</h2>
          <p>There is a tension between making memories and recording them. Growing up chronically online, means a life-long struggle with loving and hating technology. Unstagram is an example of what balance could be for those that enjoy sharing creations on the internet and learning from others who do the same. With Unstagram, the 3 pillars are as follows:</p>
          <ol>
            <li>
              Photograph with intention
            </li>
            <li>
              Celebrate the mundane, not just the highlights and picture-perfect
            </li>
            <li>
              Spend time outside away from the internet 
            </li>
            </ol>
            <p>
              This is my small rebellion from a decade of uploading my memories to Instagram. It is also an acknowledgement that if social media is no longer social, then why participate? Let socializing thrive in venues built to foster it and let memories shine in digital and physical scrapbooks. If this resonates with you, go out and build your own Unstagram escape.
            </p>
            <p>
              - Angela George
            </p>
            </Col>
          </Row>
          </Col>
          <Col lg={3} md={5}>
            {
              posts?  <Blog posts={posts}></Blog> : <></>
            }
            {
              episodes?  <IPod episodes={episodes}></IPod> : <></>
            }

          </Col>
        </Row>
        <Row noGutters>
          <footer>
            <div className="footerImgDiv">
              <img src={dolphin} alt="dolphin jumping annimation" className='footerDolphin'/>
              <img src={sunset} alt="sunset annimation" className='footerSunset'/>      
              <div className='footerFakeDolphin'>
              </div>  
            </div>
            <div className="footerParDiv">
              <p className="footerParagraph" >
                © Angela George 2025 <br></br>
                This website is not affliated with Meta or Instagram
              </p>
            </div>
          </footer>
        </Row>


        {/* Modals */}


        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title><h2>About Me</h2></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
Hi! I'm Angela. I'm the blogger behind <a href="https://angelageorge.com">angelageorge.com</a>, the podcast host of Voz Memos, and a recently converted digicam enthusiast. When I discover a new hobby I go all in. Not by buying 100s of dollars of accessories or the top of the line gear, but by shouting from the rooftops "look at this cool new thing I'm doing!" I love capturing these moments of inspiration and excitement in a web page or blog format. This site was particularly ambitious as I am self hosting the web server on a little Raspberry Pi in my closet: the ultimate indie web project.

            </p>
            <p>
I'm sure you'll learn more about me from the media linked across this site. Take a peak and if you like what you see follow for more.


            </p>
            <div className='socialIcons'>
              <a href="http://angelageorge.com"><img src={agbw} width="25px" height="25px" /></a>
              <a href="https://bsky.app/profile/angelageorge.com"><img width="25px" src="https://img.icons8.com/?size=100&id=MGqlXOe8ksH0&format=png&color=000000" height="25px" style={{marginRight:"5px"}}/></a>
              <a href="https://www.youtube.com/@vozmemos"><img src="https://img.icons8.com/?size=100&id=37326&format=png&color=000000" width="30px" height="30px" /></a>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

    
  )
}

export default App
