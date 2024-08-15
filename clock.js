class Clock {
    constructor() {
        this.interval = 1000;
        this.expected = Date.now() - this.interval;
        this.seconds = new Date().getSeconds();
        this.minutes = new Date().getMinutes();
        this.hours = new Date().getHours();
    }

    start() {
        this.timer = setTimeout(() => this.tick(), this.interval);
    }

    stop() {
        clearTimeout(this.timer);
    }

    tick() {
        let dt = Date.now() - this.expected;

        if (dt > this.interval) {
            console.error('Error');
        }

        this.expected += this.interval;

        this.increment();

        this.timer = setTimeout(() => this.tick(), Math.max(0, this.interval - dt));
    }

    increment() {
        this.seconds++;

        if (this.seconds > 59) {
            this.seconds = 0;
            this.minutes++;
        }

        if (this.minutes > 59) {
            this.minutes = 0;
            this.hours++;
        }

        if (this.hours > 23) {
            this.hours = 0;
        }
    }

    getTimestring() {
        return `${this.hours}:${this.minutes}:${this.seconds}`;
    }
}

export { Clock };