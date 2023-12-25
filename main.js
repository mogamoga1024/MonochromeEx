
const vm = {
    data() {
        return {
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
            context.putImageData(imageData, 0, 0);
        };
        image.src = "images/clover_days.jpg";
        // image.src = "images/2.jpg";
        // image.src = "images/しもんきん.jpg";
    },
    methods: {
        monochromeEx(imageData) {
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                const red   = data[i];
                const green = data[i + 1];
                const blue  = data[i + 2];
                const min = Math.min(red, green, blue);
                // const average = (red + green + blue) / 3;
                // const average = 0.2989 * red + 0.5870 * green + 0.1140 * blue;
                const average = 0.21 * red + 0.72 * green + 0.07 * blue;
                data[i]     = average;
                data[i + 1] = average;
                data[i + 2] = average;
                // data[i]     = min;
                // data[i + 1] = min;
                // data[i + 2] = min;
                // data[i]     = 0x00;
                // data[i + 1] = 0x00;
                // data[i + 2] = 0x00;
                // data[i + 3] = 0xFF - average;
                continue;
                if (red === green && green === blue) {
                    data[i]     = average;
                    data[i + 1] = average;
                    data[i + 2] = average;
                }
                else if (min === red && min === green) {
                    data[i]     = average;
                    data[i + 1] = average;
                    data[i + 2] = 0xFF;
                }
                else if (min === red && min === blue) {
                    data[i]     = average;
                    data[i + 1] = 0xFF;
                    data[i + 2] = average;
                }
                else if (min === green && min === blue) {
                    data[i]     = 0xFF;
                    data[i + 1] = average;
                    data[i + 2] = average;
                }
                else if (min === red) {
                    data[i]     = average;
                    data[i + 1] = 0xFF;
                    data[i + 2] = 0xFF;
                }
                else if (min === green) {
                    data[i]     = 0xFF;
                    data[i + 1] = average;
                    data[i + 2] = 0xFF;
                }
                else if (min === blue) {
                    data[i]     = 0xFF;
                    data[i + 1] = 0xFF;
                    data[i + 2] = average;
                }
                else {
                    throw new Error("このエラーが発生した場合、分岐に見落としがある。");
                }
            }
        }
    }
};

Vue.createApp(vm).mount('#app');
