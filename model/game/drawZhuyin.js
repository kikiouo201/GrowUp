
        let isDrawing = false;
        let x = 0;
        let y = 0;

        const myPics = document.querySelectorAll('.draw');
        console.log('pics'+myPics.length);
        myPics.forEach((pics)=>{
            console.log('pics');
            const context = pics.getContext('2d');

        // event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

        // Add the event listeners for mousedown, mousemove, and mouseup
        pics.addEventListener('mousedown', e => {
            x = e.offsetX;
            y = e.offsetY;
            isDrawing = true;
        });

        pics.addEventListener('mousemove', e => {
            if (isDrawing === true) {
                drawLine(context, x, y, e.offsetX, e.offsetY);
                x = e.offsetX;
                y = e.offsetY;
            }
        });
        window.addEventListener('mouseup', e => {
            if (isDrawing === true) {
                drawLine(context, x, y, e.offsetX, e.offsetY);
                x = 0;
                y = 0;
                isDrawing = false;
            }
        });
        });
        
        function onload() {

            let id = (new URLSearchParams(location.search)).get("id");
            console.log(`id=${id}`)
            if(id!=null){
                let zhuyin = document.querySelector(".zhuyin img");
                zhuyin.src = `../../image/zhuyin/${id}.png`;
            }
          }
    

        function drawLine(context, x1, y1, x2, y2) {
            context.beginPath();
            context.strokeStyle = 'black';
            context.lineWidth = 1;
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.stroke();
            context.closePath();
        }