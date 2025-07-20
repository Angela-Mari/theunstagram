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
import kodak2 from './assets/kodak2.jpeg';
import me from './assets/me.jpg';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import agbw from './assets/bw.png';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


function App() {

  const [posts, setPosts] = useState()

  const [episodes, setEpisodes] = useState()

  const [kodakPosts, setKodakPosts] = useState()

  // Logic for DropDown Slector, this shoudl make it so the images can change when selecting a different album
  const [index, setIndex] = useState(0);
  const handleSelect = (eventKey) => {
    setIndex(eventKey);
    console.log('Selected: ', eventKey)
  }

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
  
  // 308 is the tag for kodak posts
  fetch('https://angelageorge.com/wp-json/wp/v2/posts?tags=308')
    .then(res => res.json())
      .then((kodakData) => {
        const processedPosts = kodakData.map(post => {
          const html = post.content.rendered;

          // Use DOMParser to get image srcs from HTML
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const images = Array.from(doc.querySelectorAll('img')).map(img => img.src);

          const date = new Date(post.date);
          const fullMonthName = date.toLocaleString('default', { month: 'long' }); // e.g., "July"
          const year = date.getFullYear();

          return {
            date: `${fullMonthName} ${year}`,
            images,
          };
        });

        setKodakPosts(processedPosts);
      })
      .catch(err => console.error('Error fetching posts:', err));

  }, []);

  const [showAboutMe, setShowAboutMe] = useState(false);

  const handleCloseAboutMe = () => setShowAboutMe(false);
  const handleShowAboutMe = () => setShowAboutMe(true);

  const [showKodak, setShowKodak] = useState(false);

  const handleCloseKodak = () => setShowKodak(false);
  const handleShowKodak = () => setShowKodak(true);

  return (
    <div style={{backgroundImage:"linear-gradient( #4B3AD4, #AF1A87 75%, #FF0048 95%)", height:"100%"}}>
      <Container fluid className='p-0' >

        {/* Header */}
        <Row >
          <Col>
            
          </Col>
        </Row>

        <Container>
          {/* Menu */}
          <Navbar expand="lg">
              <Navbar.Brand>                
                  <img src={hibiscus} alt="pixel art hibiscus" width="50px" style={{marginRight:"10px"}}/>
                  The Unstagram
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link onClick={handleShowAboutMe}>About Me</Nav.Link>
                  <Nav.Link onClick={handleShowKodak}>Kodak Easyshare Z1485 IS</Nav.Link>
                  <Nav.Link href="https://angelageorge.com/zineland">Zines</Nav.Link>
                  <Nav.Link href="https://angelageorge.com/voz-memos">Podcast</Nav.Link>
                  <Nav.Link href="https://angelageorge.com/">Blog</Nav.Link>
                  <Nav.Link href="https://github.com/Angela-Mari">GitHub</Nav.Link>
                </Nav>
              </Navbar.Collapse>
          </Navbar>
        </Container>
        {/* Body */}
        <Row>

          

          {/* Kodak & Manifesto */}

          {/* Blog & iPod */}
          <Col lg={3} md={4} className="d-flex flex-column justify-content-center">
            <Container className="blogContainer">
              {
                  posts?  <Blog posts={posts}></Blog> : <></>
              }
            </Container>
              {
                episodes?  <IPod episodes={episodes}></IPod> : <></>
              }
            
          </Col>

          <Col  lg={8} md={7} >
            {/* Image Carousel */}
            <Row >

                
              <Col className="d-flex flex-column justify-content-center">
              <Dropdown as={ButtonGroup} style={{maxWidth:"200px"}} onSelect={handleSelect}>
                  <Button variant="success">{kodakPosts ? kodakPosts[index].date : ""}</Button>
                  <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />
                  <Dropdown.Menu>
                    {
                    kodakPosts? kodakPosts.map((post, idx) => (
                      <Dropdown.Item eventKey={idx}>
                        {post.date}
                      </Dropdown.Item>
                      ))
                    :
                    <></>
                    }
                  </Dropdown.Menu>
              </Dropdown>
              <div className='scaled-camera'>
              <div className='camera'>
                <Carousel className='imageGallery' controls={false} fade>
                  {/* Mapping images */}
                    {kodakPosts? kodakPosts[index].images.map((src, idx) => (
                      <Carousel.Item key={idx}>
                        <img 
                          src={src} 
                          width="280px" 
                          height="210px"
                          alt={`Gallery image ${idx + 1}`}
                          />
                      </Carousel.Item>
                    )) : <></>}
                </Carousel>
                <img src={kodak} alt="kodak easyshare pink background" className="kodak"/>
              </div>
              </div>
              </Col>
            </Row>
            <Row>
              <Col style={{color:"white"}}>
              <div style={{padding:"15px"}}>
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
              </div>
              </Col>
            </Row>
          </Col>

          
        </Row>
      
        {/* Modals */}

        {/* About Me */}
        <Modal show={showAboutMe} onHide={handleCloseAboutMe}>
          <Modal.Header closeButton>
            <Modal.Title><h2>About Me</h2></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={me} className='floated' />
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
            <Button onClick={handleCloseAboutMe}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      
      {/* About Kodak */}
      <Modal show={showKodak} onHide={handleCloseKodak} scrollable={true}>
          <Modal.Header closeButton>
            <Modal.Title><h2>Kodak Easyshare Z1485 IS</h2></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <img src={kodak2} className='floated'/>
            <p>
              I bought this camera mainly because it's pink. However, in researching the digicam trend, I was reminded of the iconic history behind the Kodak brand and its digital demise.
            </p>
            </div>
            <p>
              Specs: 14 MP, 5X Optical Zoom, 1/1.72 inch size sensor,  2.5-inch 230K pixel LCD display, 2GB SD card holds ~400 photos, launched in 2008 
            </p>
            <p>
              The Kodak Easyshare brand began in 2001 with many different subseries (DX, CX, C, Z, V, P, One, and M) ending in 2012 when the Kodak company filed for bankruptcy in January. This camera line was a small but ultimately failed effort to pull Kodak into the digital age. Kodak patented the first digital camera in 1975 but kept the technology secret, hoping they could protect film sales. After decades of resistance to pivot away from film photography, the very technology Kodak invented (years before it took off with consumers) was what caused its downfall.
            </p>
            <p>
              It's an unsettling case of self-destruction from failure to change and adapt. And yet, by using this camera today, I am resisting a different wave of change. Most point-and-shoot cameras struggle to compete with modern phone cameras. Any photography YouTube channel would scoff at using a digicam from the early 2000s. Most of them cringe at the recent spike in prices and popularity of the outdated tech. I would say, while there is a case for keeping up with the times and riding the wave of innovation, there is also a place for a moment of reflection.
            </p>
            <p>
              Those early digicams did not store 1000s of pictures. They didn't have FaceTune and AI enhancements at the touch of a button. It was one step beyond film; a chance to retake the photo if you blinked, but not take dozens of the same pic. My Z1485 has a multi-second delay between each shot! This seemed annoying at first, but slowing down is why I bought it.
            </p>
            <p>
              This is the crux of the digicam movement: nostalgia, intentionality, and living in the moment. Luckily, I managed to avoid the Etsy price gouging by sourcing mine on a Poshmark listing with no batteries or SD card. I've seen the same camera I bought for $20 listed for $40-80. More popular models cost $100+ if they have been bedazzled. So if any of this resonates with you, find an old camera and create.
            </p>
            <p><b>References</b></p>
            <p><a href="https://en.wikipedia.org/wiki/Kodak_EasyShare#cite_note-15">Wiki Kodak Easyshare</a><br/>
            <a href="https://businesshistory.domain-b.com/focus/kodak-a-journey-from-creating-memories-to-bankruptcy">Kodak A Journey From Creating Memories to Bankruptcy</a><br/>
            <a href="https://archive.nytimes.com/lens.blogs.nytimes.com/2015/08/12/kodaks-first-digital-moment">Kodaks First Digital Moment</a>
            </p>
            
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCloseKodak}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Footer */}
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
      
      </Container>
      
      </div>
  )
}

export default App
