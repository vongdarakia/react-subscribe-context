# React Subscribe Context

A consistent way of state management to avoid prop drilling, and is optimized for component rerenders.

_And it's **IE11** compatible!_

## Introduction

Some introduction

## Installation

```bash
  npm install react-subscribe-context
```

```bash
  yarn add react-subscribe-context
```

## Usage/Examples

### Setup

```typescript
// SpiderManContext.ts
import { createSubscriberContext } from "react-subscribe-context";

const initialState = {
    user: {
        name: {
            first: "Peter",
            last: "Parker",
        },
    },
    movieCounter: 9,
};

export const {
    Context: SpiderManContext,
    Provider: SpiderManProvider, // Note: This is not the same as what Context.Provider returns
} = createSubscriberContext({ initialState });
```

```typescript
// App.tsx
import { NameComponent } from "path/to/NameComponent";
import { MovieCounterComponent } from "path/to/MovieCounterComponent";

const App = (): ReactElement => {
    return (
        <div>
            <NameComponent />
            <MovieCounterComponent />
        </div>
    );
};
```

### Basic usage

```typescript
// MovieCounterComponent.tsx
import { useSubscribe } from "react-subscribe-context";
import { SpiderManContext } from "path/to/SpiderManContext";

export const MovieCounterComponent = (): ReactElement => {
    const [movieCounter, setMovieCounter] = useSubscribe(SpiderManContext, "movieCounter");

    const handleClickCounter = () => {
        setMovieCounter(movieCounter + 1);
    };

    return <button onClick={handleClickCounter}>{movieCounter}</button>;
};
```

### Subscribing to nested object values

This will subscribe to both `first` and `last` value changes. Even if the `name` object itself changes, this component will not rerender.

```typescript
// FirstNameComponent.tsx
import { useSubscribe } from "react-subscribe-context";
import { SpiderManContext } from "path/to/SpiderManContext";

export const FirstNameComponent = (): ReactElement => {
    const [user] = useSubscribe(SpiderManContext, "user");
    const {
        name: { first },
    } = user;

    return <div>{first}</div>;
};
```

```typescript
// LastNameComponent.tsx
import { useSubscribe } from "react-subscribe-context";
import { SpiderManContext } from "path/to/SpiderManContext";

export const LastNameComponent = (): ReactElement => {
    const [state] = useSubscribe(SpiderManContext);
    const {
        user: {
            name: { last },
        },
    } = state;

    return <div>{last}</div>;
};
```

```typescript
// NameComponent.tsx
import { useSubscribe } from 'react-subscribe-context';
import { SpiderManContext } from 'path/to/SpiderManContext';

export const NameComponent = (): ReactElement => {
  const [, setContextState] = useSubscribe(SpiderManContext);

  const handleClickSwapName = () => {
    if ()
    setContextState((prevState) => ({
      ...prevState,
      name: { first: last, last: first }
    }));
  }

  return (
    <div>
      <FirstNameComponent />
      <LastNameComponent />
      <button onClick={handleClickSwapName}>Swap name</button>
    </div>
  );
};
```

## Demo

Here's a [demo](https://stoic-kirch-0be43f.netlify.app/).

Be sure to turn on render highlighting with your [React Dev Tool](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) to see the differences between rendering performances between each example.
