import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return value; 
    const now = +new Date();
    const then = +new Date(value);
    const seconds = Math.floor((now - then) / 1000);

    if (seconds < 30) {
      return 'Just now 🔥'; 
    }

    const intervals: { [key: string]: number } = {
      'y': 31536000,
      'd': 86400,   
      'h': 3600,     
      'm': 60,      
      's': 1        
    };

    if (seconds >= intervals['y']) {
      const date = new Date(value);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }); 
    }

    for (const [unit, threshold] of Object.entries(intervals)) {
      const counter = Math.floor(seconds / threshold);
      if (counter > 0) {
        let flair = '';
        if (unit === 's' && counter < 60) flair = ' ⏱️';  
        else if (unit === 'm' && counter < 60) flair = ' ⚡'; 
        else if (unit === 'h' && counter < 24) flair = ' 🌙';
        else if (unit === 'd' && counter < 7) flair = ' ☀️';  
        return `${counter}${unit}${flair}`; 
      }
    }
    return 'Time’s a mystery! 🤔';
  }
}