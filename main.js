
const vm = {
    data() {
        return {
            isSelected: {
                averageMethod: true,
                weightedAverageMethod: true,
                luminosityMethod: true,
            },
            imageSrc: "https://picsum.photos/800/400",
        }
    },
    mounted() {
        this.imageSrc = "images/clover_days.jpg";
        // this.imageSrc = "images/2.jpg";
        // this.imageSrc = "images/しもんきん.jpg";
        this.updateAllCanvas();
    },
    methods: {
        onClickRandomImageButton() {
            this.imageSrc = "https://picsum.photos/800/400";
            this.updateAllCanvas();
        },
        loadImage() {
            const image = new Image();
            image.setAttribute("crossorigin", "anonymous");
            return new Promise((resolve, reject) => {
                image.onload = () => {
                    resolve(image);
                };
                image.onerror = e => {
                    reject(e);
                };
                image.src = this.imageSrc;
            });
        },
        async updateAllCanvas() {
            const image = await this.loadImage();
            this.updateCanvas(
                this.$refs.averageMethodCanvas,
                image,
                this.applyAverageMethod
            );
            this.updateCanvas(
                this.$refs.weightedAverageMethodCanvas,
                image,
                this.applyAverageMethod
            );
            this.updateCanvas(
                this.$refs.luminosityMethodCanvas,
                image,
                this.applyAverageMethod
            );
        },
        updateCanvas(canvas, image, applyMethod) {
            const context = canvas.getContext("2d", {willReadFrequently: true});
            canvas.width = image.width;
            canvas.height = image.height;
            canvas.style.maxWidth = `${image.width}px`;
            context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            applyMethod(imageData);
            context.putImageData(imageData, 0, 0);
        },
        applyAverageMethod(imageData) {
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                const red   = data[i];
                const green = data[i + 1];
                const blue  = data[i + 2];
                const grayscaleValue = (red + green + blue) / 3;
                data[i]     = grayscaleValue;
                data[i + 1] = grayscaleValue;
                data[i + 2] = grayscaleValue;
            }
        },
        applyWeightedAverageMethod(imageData) {
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                const red   = data[i];
                const green = data[i + 1];
                const blue  = data[i + 2];
                const grayscaleValue = 0.2989 * red + 0.5870 * green + 0.1140 * blue;
                data[i]     = grayscaleValue;
                data[i + 1] = grayscaleValue;
                data[i + 2] = grayscaleValue;
            }
        },
        applyLuminosityMethod(imageData) {
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                const red   = data[i];
                const green = data[i + 1];
                const blue  = data[i + 2];
                const grayscaleValue = 0.21 * red + 0.72 * green + 0.07 * blue;
                data[i]     = grayscaleValue;
                data[i + 1] = grayscaleValue;
                data[i + 2] = grayscaleValue;
            }
        },
    }
};

Vue.createApp(vm).mount('#app');
