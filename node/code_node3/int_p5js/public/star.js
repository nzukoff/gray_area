class Star {
    constructor() {
        this.x = random(-width/2,width/2)
        this.y = random(-height/2,height/2)
        this.z = random(width)
        this.pz = this.z
        this.h = 0
        this.pink = false
    }

    update() {
        this.z -= 30
        if (this.z < 1) {
            this.x = random(-width/2,width/2)
            this.y = random(-height/2,height/2)
            this.z = random(width)
            this.pz = this.z
        }
    }

    show() {
        let sx = map(this.x/this.z, 0, 1, 0, width)
        let sy = map(this.y/this.z, 0, 1, 0, height)
        let px = map(this.x/this.pz, 0, 1, 0, width)
        let py = map(this.y/this.pz, 0, 1, 0, height)
        this.pz = this.z
        strokeWeight(2)
        if (this.pink) {
            stroke(255, 0, 102)
        } else {
            stroke(255, 255, 255)            
        }
        
        // this.h+=0.1
        // if (this.h > 255) {
        //     this.h = 0;
        // }
        line(px, py, sx, sy)
    }
}