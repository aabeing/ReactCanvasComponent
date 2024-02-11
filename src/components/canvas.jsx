import React, { useRef, useEffect } from 'react';

const CircleCanvas = () => {
    const canvasRef = useRef(null);
    // const canvas = canvasRef.current;
    const FVAL = {
        radius: 2,
        speedConst: 0.9,
        colorCircle: 'rgba(255,255,255,0.7)',
        circleCount: 100,
        linkDist: 130
    }

    // const repulseCircle = {
    //     radius: 100,
    //     x: 50,
    //     y: 50
    // }
    useEffect(() => {
        const canvas = canvasRef.current;
        // const repulseCircle = {
        //     radius: 200,
        //     x: canvas.width / 2,
        //     y: canvas.height / 2
        // }
        const context = canvas.getContext('2d');
        const circles = [];

        // const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        const createCircle = () => {
            // const radius = getRandomInt(FVAL.minRadius, FVAL.maxRadius);
            const radius = FVAL.radius
            // const x = getRandomInt(radius, canvas.width - radius);
            // const y = getRandomInt(radius, canvas.height - radius);
            let x = Math.random() * canvas.width
            let y = Math.random() * canvas.height

            // const dx = getRandomInt(FVAL.speed * -1, FVAL.speed) // Random horizontal speed
            // const dy = getRandomInt(FVAL.speed * -1, FVAL.speed) // Random vertical speed
            let dx = Math.random() - FVAL.speedConst
            let dy = (Math.random() - FVAL.speedConst) * 4

            // const color = `rgba(${getRandomInt(255, 255)}, ${getRandomInt(255, 255)}, ${getRandomInt(255, 255)}, 0.8)`;
            const color = FVAL.colorCircle

            // // Check for collisions with other circles
            // const diffx = x - repulseCircle.x;
            // const diffy = y - repulseCircle.y;
            // // Distance b/w two points
            // const distance = Math.sqrt(diffx * diffx + diffy * diffy);

            // if (distance < radius + repulseCircle.radius) {
            //     // Circles collided, bounce back
            //     x += repulseCircle.radius
            //     y += repulseCircle.radius
            // }

            circles.push({ x, y, radius, dx, dy, color });
        };

        const updateCircles = () => {
            circles.forEach(circle => {
                circle.x += circle.dx;
                circle.y += circle.dy;
                // Bounce off window edges
                if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
                    circle.dx *= -1;
                    circle.dx *= Math.random() * 0.2 + 0.9;


                }
                if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
                    circle.dy *= -1;
                    circle.dy *= Math.random() * 0.2 + 0.9;

                }

                // Bounce off window edges
                // if (circle.x - circle.radius < 0 || circle.x + circle.radius > canvas.width) {
                //     // circle.dx *= -1;
                //     circle.dx = (Math.random() - FVAL.speedConst) * -1

                // }
                // if (circle.y - circle.radius < 0 || circle.y + circle.radius > canvas.height) {
                //     // circle.dy *= -1;
                //     circle.dy = (Math.random() - FVAL.speedConst) * -1
                // }

                // Check for collisions with other circles
                // circles.forEach(otherCircle => {
                // if (circle !== otherCircle) {
                // context.beginPath();
                // context.arc(repulseCircle.x, repulseCircle.y, repulseCircle.radius, 0, 2 * Math.PI);
                // // context.strokeStyle = circle.color;
                // context.strokeStyle = '#ffff00';
                // context.stroke();
                // // Check for collisions with other circles
                // const diffx = circle.x - repulseCircle.x;
                // const diffy = circle.y - repulseCircle.y;
                // // Distance b/w two points
                // const distance = Math.sqrt(diffx * diffx + diffy * diffy);

                // if (distance < circle.radius + repulseCircle.radius) {
                //     // Circles collided, bounce back
                //     circle.dx *= -1
                //     circle.dy *= -1
                // }
                // }
                // });
            });
        };

        const drawCircles = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            circles.forEach(circle => {
                context.beginPath();
                context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
                context.fillStyle = circle.color;
                context.fill();
            });
        };

        const drawLines = () => {
            for (let i = 0; i < circles.length; i++) {
                for (let j = i + 1; j < circles.length; j++) {
                    const dx = circles[i].x - circles[j].x;
                    const dy = circles[i].y - circles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < FVAL.linkDist) {
                        let opacity = 0.9
                        context.lineWidth = 0.9;
                        if (distance > FVAL.linkDist / 2) {
                            opacity = 0.9 - (distance/300)
                            context.lineWidth = 0.3;
                            context.lineWidth = 0.6 - (distance/300)
                        }

                        context.beginPath();
                        context.moveTo(circles[i].x, circles[i].y);
                        context.lineTo(circles[j].x, circles[j].y);
                        // context.strokeStyle = 'rgba(255, 255, 255, 0.2);';
                        context.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                         // Adjust line thickness here
                        // context.setLineDash([5, 3]);
                        context.stroke();
                    }
                }
            }
        };

        const animate = () => {
            updateCircles();
            drawCircles();
            drawLines();
            requestAnimationFrame(animate);
        };

        // Initialize canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Create initial circles
        for (let i = 0; i < FVAL.circleCount; i++) {
            createCircle();
        }

        animate();

        // Cleanup
        return () => cancelAnimationFrame(animate);
    }, []);

    return <canvas ref={canvasRef} style={{
        width: '100%', height: '100%',
        background: 'rgb(23, 22, 26)'
    }} />;
};

export default CircleCanvas;
