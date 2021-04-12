const car = (name, model, owner, year, phone, image) => (
    {name, model, owner, year, phone, image,}
);

const cars = [
    car("Ford", "Focus", "Tony", 2016, "+7 453 123-45-67", "Ford.png"),
    car("Mitsubishi", "Outlander", "Harper", 2012, "+7 123 123-45-67", "Mitsubishi.png"),
    car("Porch", "Panamera", "Valum", 2011, "+7 344 123-45-67", "Porsh.png"),
];

const log = (text, type, date = new Date()) => ({text, type, date})

new Vue({
    el: "#app",

    data: {
        cars: cars,
        isActiveCar: cars[0],
        logs: [],
        selectedIndexCar: 0,
        phoneVisibility: false,
        modalVisibility: false,
        search: '',
    },

    methods: {
        selectCar: function (car) {
            // Функция определения выбранной карточки машины.
            const indexSelectCar = cars.map(e => e.name).indexOf(car.name)
            this.isActiveCar = cars[indexSelectCar]
            this.selectedIndexCar = indexSelectCar

            // console.log(cars[index].name);
            // console.log(cars.map(e => e.name).indexOf(car.name));
            // console.log(typeof(car));
            // console.log(car.findIndex(item => item.name === car.name));
            // console.log(Array.prototype.indexOf(car.name));
            // console.log(this.isActiveCar);
        },
        cancelOrderCar() {
            this.modalVisibility = false
            this.logs.push(
                log(`Canceled order: ${this.isActiveCar.name} - ${this.isActiveCar.model}`, 'cnl')
            )
        },
        newOrderCar() {
            this.modalVisibility = false
            this.logs.push(
                log(`Success order: ${this.isActiveCar.name} - ${this.isActiveCar.model}`, 'ok')
            )
        },
        buyStatus(log) {
            // console.log(log.type)
            return log.type === 'ok' ? 'list-group-item list-group-item-success' : 'list-group-item list-group-item-secondary'
        },
    },
    computed: {
        phoneButtonText() {
            return this.phoneVisibility ? 'Hide phone' : 'Show phone'
        },
        filteredCars() {
            return this.cars.filter(car => {
                    return car.name.toLowerCase().indexOf(this.search) > -1 ||
                        car.name.indexOf(this.search) > -1 ||
                        car.model.toLowerCase().indexOf(this.search) > -1 ||
                        car.model.indexOf(this.search) > -1
                }
            )
        }
    },
    filters: {
        date(value) {
            return value.toLocaleString()
        },
    },
});
