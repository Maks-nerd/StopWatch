// Модули
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Observable, Subject } from 'rxjs';
import { map, buffer, debounceTime, filter, takeUntil } from 'rxjs/operators';

// Компоненты
import TimeControls from './components/TimeControls';

const App = () => {
  const [state, setState] = useState(false);
  const [time, setTime] = useState(0);

  const stop = useMemo(() => new Subject(), []);
  const click = useMemo(() => new Subject(), []);

  const startTime = () => {
    setState(true);
  };

  const stopTime = useCallback(() => {
    setTime(0);
    setState(false);
  }, []);

  const resetTime = useCallback(() => {
    setTime(0);
  }, []);

  const waitTime = useCallback(() => {
    click.next();
    setState(false);
    click.next();
  }, [click]);

  useEffect(() => {
    const doubleClick = click.pipe(
      buffer(click.pipe(debounceTime(300))),
      map(clicks => clicks.length),
      filter(clicks => clicks >= 2),
    );
    const timer = new Observable(observer => {
      let count = 0;
      const intervalId = setInterval(() => {
        observer.next((count += 1));
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    });

    const subscribtion = timer
      .pipe(takeUntil(doubleClick))
      .pipe(takeUntil(stop))
      .subscribe({
        next: () => {
          if (state) {
            setTime(prevTime => prevTime + 1);
          }
        },
      });

    return () => {
      subscribtion.unsubscribe();
    };
  }, [state, click, stop]);

  return (
    <div>
      <TimeControls
        time={time}
        startTime={startTime}
        stopTime={stopTime}
        resetTime={resetTime}
        waitTime={waitTime}
      />
    </div>
  );
};

export default App;
