'use strict';

class Sorter {
    static positionSort ( first, second ) {
        let positions = {
            QB: 6,
            RB: 5,
            WR: 4,
            TE: 3,
            Def: 2,
            PK: 1
        };
        let a = positions[ first.position ];
        let b = positions[ second.position ];

        if ( a < b ) {
            return 1;
        }

        if ( a > b ) {
            return -1;
        }

        return 0;
    };
}

module.exports = Sorter;
