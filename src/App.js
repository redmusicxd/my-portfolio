import './App.css';
import { Box, Typography } from '@material-ui/core';
import { useSpring, animated, useTransition } from 'react-spring';
import { useState } from 'react';
import Close from "@material-ui/icons/Close";
import { config, Spring } from 'react-spring/renderprops';
import Grid from './Grid'
import { Slug, Fade } from './Primitives';
import gradients from './gradients';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useMediaQuery } from 'react-responsive';
import './styles.css'
import { useCallback } from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { FirestoreCollection, FirestoreProvider } from '@react-firebase/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
      <Spring
        from={{ value: 0 }}
        to={{ value: props.value }}
        config={{tension: 100, friction: 40}}>
        {an => <Typography variant="h6" component="div" color="textSecondary">{`${Math.round(
          an.value,
        )}%`}</Typography>}
      </Spring>
      </Box>
    </Box>
  );
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function Cell({ toggle, id, name, description, demo, screenshots, url, css, active }) {
  const [indexGradient, ] = useState(Object.defineProperty({}, id, {value: {gradient: gradients[getRandomInt(0, gradients.length)]}, writable: true}))
  const [images, ] = useState(screenshots.map(ss => ({ style }) => <animated.div style={{ ...style, background: ss && ss.includes(".png") ? `url(/${ss})` : "lightblue", backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", fontSize: ss === "N/A" ? '10rem' : '5rem'}}>{ss && !ss.includes(".png") ? ss : ss && ss.includes(".png") ? "" : "N/A"}</animated.div>))
  
  const [index, set] = useState(0)
  const onClick = useCallback(() => set(state => (state + 1) % images.length), [images.length])
  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })

    return (
    <div
      className="cell"
      style={{ backgroundImage: indexGradient[id].gradient, cursor: !active && toggle ? 'pointer' : 'auto', zIndex: 0 }}
      onClick={!active && toggle ? toggle : undefined}>
      <Fade show={active} delay={active ? 500 : 0}>
        <div className="details">
          <Slug delay={600}>
          <div className="close" onClick={toggle} style={{cursor: "pointer"}}>
              <Close/>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', height: '70%', position: "relative", top: "-80px"}}>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              {url ? <a className="circle" style={{ background: indexGradient[id].gradient, textDecoration: "none" }} href={url}>
              <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="inherit"
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="100%"
              >
                <Typography variant="h6" component="div" color="textSecondary">GitHub</Typography>
              </Box>
              </a> : null }              
              {demo ? <a className="circle" style={{ background: indexGradient[id].gradient, textDecoration: "none" }} href={demo}>
              <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="inherit"
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="100%"
              >
                <Typography variant="h6" component="div" color="textSecondary">Demo</Typography>
              </Box>
              </a> : null}
            </div>
            <div onClick={onClick} className="simple-trans-main">
                {transitions.map(({ item, props, key }) => {
                  const Page = images[item]
                  return <Page key={key} style={props} />
                })}
              </div>
          </div>
            <div>
              <h1>{name}</h1>
              <p>{description}</p>
            </div>
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

export default function App() {
  const { REACT_APP_FIREBASE_APPID: appId, REACT_APP_FIREBASE_PROJECTID: projectId, REACT_APP_FIREBASE_APIKEY: apiKey, REACT_APP_FIREBASE_AUTHDOMAIN: authDomain } = process.env
  const firebaseConfig = {appId, projectId, authDomain, apiKey}
  const [active, setActive] = useState(false);
  const [skills, setskills, ] = useSpring(() => ({height: '0%', position: 'relative', background: "linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)"}))
  const [myself, setmy, ] = useSpring(() => ({opacity: '1', cursor: 'pointer'}));
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 750px)'
  })  
    return (
      <FirestoreProvider {...firebaseConfig} firebase={firebase}>
        <animated.div className="myself" style={myself} onClick={() => {setActive(true); setmy({opacity: '0', cursor: "auto"}); setskills({height: "100%"});}}>
          <Slug delay={600} style={{position: 'fixed'}}>
            <div>
              <h1>Dan C. Negru</h1>
              <p>19 year old IT Technician</p>
            </div>
            <div>
              <h1 style={{marginLeft: "2rem", display: "flex", alignItems: "center"}}>Skills <ArrowForwardIcon/></h1>
            </div>
          </Slug>
        </animated.div>
        <animated.div style={skills}>
          <Fade show={active} delay={active ? 500 : 0}>
              <div className="skills">
                <Slug delay={600}>
                  <FirestoreCollection path="/skills">
                    {d => {
                      return d.isLoading ? "Loading" :
                      <div style={{width: '100%', height: '100%'}}>
                        {d.value.map((skill, i) => 
                        <div key={i} className="skillc" style={{ background: 'linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)', color: "white", display: 'flex', alignItems: "center" }}>
                          <Spring
                          from={{value: 0}}
                          to={{value: skill.percent}}
                          config={{tension: 150, friction: 20}}>
                            {props => <CircularProgressWithLabel {...props} size="75px" thickness={2} color="inherit" />}
                          </Spring>
                          <Typography variant="h5" style={{marginLeft: "2rem", color: "burlywood"}}>{skill.name}</Typography>
                        </div>)}
                      </div>
                    }}
                  </FirestoreCollection>
                  <div className="close" onClick={() => {setActive(false);setmy({opacity: '1', cursor: "pointer"});setskills({height: "0%"})}} style={{cursor: "pointer"}}>
                    <Close/>
                  </div>
                  <h1>Dan C. Negru</h1>
                  <p>19 year old</p>
                </Slug>
              </div>
          </Fade>
        </animated.div>
        <FirestoreCollection path="/projects">
        {d => {
        return d.isLoading ? "Loading" : <Grid
          className="grid"
          // Arbitrary data, should contain keys, possibly heights, etc.
          data={d.value}
          // Key accessor, instructs grid on how to fet individual keys from the data set
          keys={d => d.id}
          // Can be a fixed value or an individual data accessor
          heights={d => d.height || 100}
          // Number of columns
          columns={isDesktopOrLaptop ? 4 : 2}
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
        }}
        </FirestoreCollection>
      </FirestoreProvider>
    )
}
