import { Clock } from './clock.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const clock = new Clock();
const center = {
    x: canvas.width / 2,
    y: canvas.height / 2
};
const radius = 200;

const drawClockFace = (width) => {
    const gradient = ctx.createRadialGradient(
        300, 150, 300, 150, 75, 150);

    gradient.addColorStop(0, '#bbb');
    gradient.addColorStop(1, '#fff');

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.strokeStyle = '#111';
    ctx.lineWidth = width;
    ctx.ellipse(
        center.x, 
        center.y, radius, 
        radius, 0, 0, Math.PI * 2, true
    );
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

const drawClockBorder = (size) => {
    const gradient = ctx.createRadialGradient(
        150, 75, 300, 150, 75, 100);
        
    gradient.addColorStop(0, '#111');
    gradient.addColorStop(1, '#444');

    ctx.beginPath();
    ctx.strokeStyle = gradient;
    ctx.lineWidth = size;
    ctx.shadowColor = 'rgb(0 0 0 / 50%)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 4;
    ctx.ellipse(
        center.x, 
        center.y, 
        radius + size * 0.4, 
        radius + size * 0.4, 
        0, 0, Math.PI * 2, true
    );
    ctx.stroke();
    ctx.closePath();
}

const drawTimeMarking = (angle, size, diff) => {
    const ctx2 = canvas.getContext('2d');
    
    ctx2.save();
    ctx2.translate(center.x, center.y);
    ctx2.rotate(angle);
    ctx2.beginPath();
    ctx2.shadowBlur = 0;
    ctx2.shadowOffsetY = 0;
    ctx2.lineCap = 'round';
    ctx2.strokeStyle = 'gray';
    ctx2.lineWidth = size;
    ctx2.moveTo(radius - 10, 0);
    ctx2.lineTo(radius - diff, 0);
    ctx2.stroke();
    ctx2.closePath();
    ctx2.restore();
}

const drawTimeHourMarking = (hour, size) => {
    const offset = -(Math.PI / 2);

    ctx.beginPath();
    ctx.font = 'bold 32px serif';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    ctx.fillText(hour,
        center.x + Math.cos(offset + ((Math.PI * 2) / 12) * hour) * size,
        center.y + Math.sin(offset + ((Math.PI * 2) / 12) * hour) * size
    );
    ctx.closePath();
}

const drawTimeMarkings = () => {
    let hour = 0;

    for (let i = 0; i < 60; i++) {
        if (i % 5 == 0) {
            hour++;

            drawTimeMarking(((Math.PI * 2) / 60) * i, 2, 30);
            drawTimeHourMarking(hour, radius * 0.75);

            continue;
        }

        drawTimeMarking(((Math.PI * 2) / 60) * i, 1, 20);
    }
}

const drawClockCenter = (size) => {
    const gradient = ctx.createRadialGradient(
        300, 150, 300, 150, 75, 150);
        
    gradient.addColorStop(0, "#000");
    gradient.addColorStop(1, "#888");
    
    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.ellipse(
        center.x, 
        center.y, 
        size, 
        size, 
        0, 0, Math.PI * 2, true
    );
    ctx.fill();
    ctx.closePath();
}

const drawClockHand = (subdivisions, time, length, color, size) => {
    const offset = -(Math.PI / 2);
    const gradient = ctx.createRadialGradient(
        300, 200, 300, 150, 75, 150);

    gradient.addColorStop(0, "#111");
    gradient.addColorStop(1, "#666");

    ctx.beginPath();
    ctx.strokeStyle = gradient;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.shadowBlur = 1;
    ctx.shadowOffsetY = 0;
    ctx.shadowColor = 'black';
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(
        center.x + Math.cos(offset + ((Math.PI * 2) / subdivisions) * time) * length,
        center.y + Math.sin(offset + ((Math.PI * 2) / subdivisions) * time) * length
    );
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(
        center.x - Math.cos(offset + ((Math.PI * 2) / subdivisions) * time) * 30,
        center.y - Math.sin(offset + ((Math.PI * 2) / subdivisions) * time) * 30
    );
    ctx.stroke();
    ctx.closePath();
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawClockFace(8);
    drawTimeMarkings();
    drawClockBorder(25);
    drawClockHand(12, clock.hours, radius - 50, 'black', 10);
    drawClockHand(60, clock.minutes, radius - 40, 'black', 6);
    drawClockHand(60, clock.seconds, radius - 10, 'red', 4);
    drawClockCenter(12);

    requestAnimationFrame(update);
}

requestAnimationFrame(update);

clock.start();