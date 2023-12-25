
const vm = {
    data() {
        return {
            hoge: 'Hello Vue!'
        }
    },
    mounted() {
        const image = new Image();
        image.onload = () => {
            const canvas = this.$refs.canvas;
            const context = canvas.getContext("2d");
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            this.monochromeEx(imageData);
            // todo
        };
        image.src = "images/clover_days.jpg";
    },
    methods: {
        monochromeEx(imageData) {
            // todo
        }
    }
};

Vue.createApp(vm).mount('#app');
