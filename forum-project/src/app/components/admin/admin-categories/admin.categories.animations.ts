import {
  trigger,
  style,
  transition,
  animate,
} from '@angular/animations';

export const adminCategoriesAnimations = [
  trigger('cats', [
    transition('void => *', [
      style({
        opacity: 0,
        transform: 'translateX(-100px)'
      }),
      animate(300)
    ]),
    transition('* => void', [
      animate(1500, style({
        transform: 'translateX(100px)',
        opacity: 0
      }))
    ])
  ]),
];
