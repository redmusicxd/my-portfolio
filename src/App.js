import './App.css';
import styled from "styled-components";
import { Typography } from '@material-ui/core';
import { useSpring, animated, useTransition } from 'react-spring';
import { useState, Component } from 'react';
import Close from "@material-ui/icons/Close";
import { config, Spring } from 'react-spring/renderprops';
import Grid from './Grid'
import { Slug, Fade } from './Primitives'
import data from './data'
import './styles.css'

class Cell extends Component {
  render() {
    const { toggle, name, description, css, active } = this.props
    return (
      <div
        className="cell"
        style={{ backgroundImage: css, cursor: !active && toggle ? 'pointer' : 'auto', zIndex: 0 }}
        onClick={!active && toggle ? toggle : undefined}>
        <Fade show={active} delay={active ? 500 : 0}>
          <div className="details">
            <Slug delay={600}>
              <div className="circle" style={{ background: css }} />
              <div className="close" onClick={toggle} style={{cursor: "pointer"}}>
                <Close/>
              </div>
              <h1>{name}</h1>
              <p>{description}</p>
            </Slug>
          </div>
        </Fade>
        <Fade
          show={!active}
          from={{ opacity: 0, transform: 'translate3d(0,140px,0)' }}
          enter={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
          leave={{ opacity: 0, transform: 'translate3d(0,-50px,0)' }}
          delay={active ? 0 : 400}>
          <div className="default">
            <div style={{ zIndex: 1 }}>{name}</div>
          </div>
        </Fade>
      </div>
    )
  }
}

const Container = styled.div({
  width: "100%",
  height: "100%",
  display: "flex",
  // backgroundColor: "#212121",
  flexDirection: "column",
  backgroundImage: "url(/background.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
})

const SkillContainer = styled.div({
  display: 'flex',
  height: "max-content",
  padding: "1rem"
})

const CardBack = styled(animated.div)({
  position: 'absolute',
  // maxWidth: '500px',
  // maxHeight: '500px',
  width: "90%",
  height: "50%",
  cursor: "pointer",
  willChange: "transform, opacity",
  backgroundSize: 'cover',
  backgroundImage: "url(/background2.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  display: "flex",
  borderRadius: "20px",
  boxShadow: "1px 2px 3px"
})
const CardFront = styled(animated.div)({
  position: 'absolute',
  // maxWidth: '500px',
  maxHeight: '500px',
  width: "90%",
  height: "50%",
  cursor: "pointer",
  willChange: "transform, opacity",
  backgroundSize: 'cover',
  backgroundImage: "url(https://us.123rf.com/450wm/artursz/artursz1812/artursz181204365/112905014-writing-note-showing-who-am-i-question-business-photo-showcasing-when-being-asked-about-your-name-st.jpg?ver=6)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "20px",
  boxShadow: "1px 2px 3px"
})

const HomeTypo = styled(Typography)({ 
  padding: ".5rem",
  color: "white"
})
const SpringBottom = styled(Spring)({
  width: "8rem",
  alignItems: "center"
})
const CardContainer = styled.div({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
})
const Toolbar = styled.div({
  top: 0,
  height: "3rem",
  position: "sticky",
  display: "flex",
  alignItems: "center",
  padding: ".3rem",
  paddingLeft: "1rem",
  backgroundColor: "#121212"
})

// function App() {
//   return (
//     <Container>
//       {/* <Toolbar>
//           <HomeTypo>Dan C. Negru</HomeTypo>
//       </Toolbar> */}
//       <Card>
//         {flipped => 
//           !flipped ? 
//           <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
//             <Typography variant="h3" style={{color: "brown"}}>Hi, I'm Dan</Typography>
//             <Typography variant="h5">19 year old IT enthusiast from Romania</Typography>
//             {/* <Typography variant="h5">Romania</Typography> */}
//             <Typography variant="h6" style={{marginTop: "1rem"}}>Click to see my skills</Typography>
//           </div>
//           : 
//           <SkillContainer>
//             <Star value={100}/>
//             <Typography>Javascript</Typography>
//           </SkillContainer>
//         }
//       </Card>
//     </Container>
//   );
// }
export default function App() {
  const [active, setActive] = useState(false);
  const [skills, setskills, stopskills] = useSpring(() => ({height: '0%', position: 'relative', background: "linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)"}))
  const [myself, setmy, stopmy] = useSpring(() => ({opacity: '1'}))
    return (
      <>
        <animated.div className="myself" style={myself} onClick={() => {setActive(true); setmy({opacity: '0'}); setskills({height: "100%"})}}>
          <Slug delay={600} style={{position: 'fixed'}}>
            <div>
              <h1>Dan Negru</h1>
              <p>19 year old IT Technician</p>
            </div>
            {/* <div style={{display: 'flex', flex: 1}}></div>
            <div style={{display: 'flex', flexDirection: 'row', width: '8rem'}}>
              <Spring
                from={{ number: 0 }}
                to={{ number: 50 }}
                config={config.molasses}>
                {props => 
                <>
                  <h1>Javascript <p style={{padding: 0}}>{Math.trunc(props.number) + "%"}</p></h1>
                  <div style={{display: 'flex', flex: 1}}/>
                  <h1>Javascript <p style={{padding: 0}}>{Math.trunc(props.number) + "%"}</p></h1>
                  <div style={{display: 'flex', flex: 1}}/>
                </>}
              </Spring>
            </div>
            <div style={{display: 'flex', flex: 1}}></div> */}
          </Slug>
        </animated.div>
        <animated.div style={skills}>
          <Fade show={active} delay={active ? 500 : 0}>
              <div className="details">
                <Slug delay={600}>
                  <div className="circle" style={{ background: 'linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)' }} />
                  <div className="close" onClick={() => {setActive(false);setmy({opacity: '1'});setskills({height: "0%"})}} style={{cursor: "pointer"}}>
                    <Close/>
                  </div>
                  <h1>DSADF</h1>
                  <p>DSGSG</p>
                </Slug>
              </div>
          </Fade>
        </animated.div>
        <Grid
          className="grid"
          // Arbitrary data, should contain keys, possibly heights, etc.
          data={data}
          // Key accessor, instructs grid on how to fet individual keys from the data set
          keys={d => d.name}
          // Can be a fixed value or an individual data accessor
          heights={d => d.height}
          // Number of columns
          columns={2}
          // Space between elements
          margin={30}
          // Removes the possibility to scroll away from a maximized element
          lockScroll={false}
          // Delay when active elements (blown up) are minimized again
          closeDelay={500}
          // Regular react-spring configs
          config={config.slow}>
          {(data, active, toggle) => (
            <Cell {...data} active={active} toggle={toggle} />
          )}
        </Grid>
      </>
    )
}
function Star({value}){
  return <Spring
  from={{ x: 156 }}
  to={{ x: value }}
  config={{tension: 150, friction: 100}}
  >
  {props => (
    <svg width="50px" viewBox="0 0 45 44" stroke-width="2" fill="white" stroke="rgb(45, 55, 71)" stroke-linecap="round" stroke-dasharray="156" stroke-dashoffset={props.x}>
      <polygon points="22.5 35.25 8.68704657 42.5118994 11.3250859 27.1309497 0.150171867 16.2381006 15.5935233 13.9940503 22.5 0 29.4064767 13.9940503 44.8498281 16.2381006 33.6749141 27.1309497 36.3129534 42.5118994"></polygon>
    </svg>
  )}
</Spring>
}
function Card({front, back, children}) {
  const [flipped, set] = useState(false)
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  })
  return (
    <CardContainer onClick={() => set(state => !state)}>
      <CardFront style={{ opacity: opacity.interpolate(o => 1 - o), transform }}>
        {typeof children === "function" ? children(flipped) : children}
      </CardFront>
      <CardBack style={{ opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`) }}>
      {typeof children === "function" ? children(flipped) : children}
      </CardBack>
    </CardContainer>
  )
}

// export default App;
