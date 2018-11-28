export class Film {

    photo: string;
    constructor(
        public id: number,
        public name: string,
        public synopsisShort: string,
        public synopsisLong: string,
        public date: Date,
        public realisator: string,

    ) {

    }
}
