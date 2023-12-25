
const vm = {
    data() {
        return {
            isSelected: {
                averageMethod: true,
                weightedAverageMethod: true,
                luminosityMethod: true,
            },
            shouldDisplayCanvas: {
                averageMethod: true,
                weightedAverageMethod: true,
                luminosityMethod: true,
            },
            imageSrc: "",
        }
    },
    mounted() {
        this.imageSrc = "images/clover_days.jpg";
        // image.src = "images/2.jpg";
        // image.src = "images/しもんきん.jpg";
        this.onClickApplyButton();
    },
    methods: {
        onClickApplyButton() {
            if (this.isSelected.averageMethod) {
                this.updateAverageMethodCanvas();
            }
            if (this.isSelected.weightedAverageMethod) {
                this.updateWeightedAverageMethodCanvas();
            }
            if (this.isSelected.luminosityMethod) {
                this.updateLuminosityMethodCanvas();
            }
            this.shouldDisplayCanvas.averageMethod = this.isSelected.averageMethod;
            this.shouldDisplayCanvas.weightedAverageMethod = this.isSelected.weightedAverageMethod;
            this.shouldDisplayCanvas.luminosityMethodCanvas = this.isSelected.luminosityMethodCanvas;
        },
        updateAverageMethodCanvas() {
            this.updateCanvas(this.$refs.averageMethodCanvas, this.applyAverageMethod);
        },
        updateWeightedAverageMethodCanvas() {
            this.updateCanvas(this.$refs.weightedAverageMethodCanvas, this.applyWeightedAverageMethod);
        },
        updateLuminosityMethodCanvas() {
            this.updateCanvas(this.$refs.luminosityMethodCanvas, this.applyLuminosityMethod);
        },
        updateCanvas(canvas, applyMethod) {
            const image = new Image();
            image.onload = () => {
                const context = canvas.getContext("2d");
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                applyMethod(imageData);
                context.putImageData(imageData, 0, 0);
            };
            image.src = this.imageSrc;
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
