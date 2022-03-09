# React Subscribe Context

A consistent way of state management to avoid prop drilling, and is optimized for component rerenders.

_And it's **IE11** compatible!_

## Introduction

React Context is an amazing tool to help avoid prop drilling, but it comes with a price. It's not a pleasant dev experience to create setters for every value you want in your context, and each time those values changes, it'll rerender **every** child it holds/consumes, unless they're memoized, but who wants to put in that extra work to memoize everything?

I was inspired by [react-hook-form](https://github.com/react-hook-form/react-hook-form) and their [useWatch](https://react-hook-form.com/api/usewatch/), which subscribed to only changes to a specific value of a form. I loved that feature and thought it'd be great if React Context could do that too. Then I learned about [react-tracked](https://github.com/dai-shi/react-tracked).
It did exactly what I was looking for, except that it wasn't IE11 compatible, so I decided to create react-subscribe-context.

Using Proxy and EventEmitter, I created a tool where you can subscribe to a value just by accessing it, and it works for nested objects as well. It's simple to set up and works similar to the React hook, `useState`!

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

These components will subscribe to `first` and `last` value changes. Even if the `name` object itself changes, this component will not rerender unless that `first` or `last` values are different. The examples below shows two different ways of subscribing to a nested value.

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
import { useSubscribe } from "react-subscribe-context";
import { SpiderManContext } from "path/to/SpiderManContext";

export const NameComponent = (): ReactElement => {
  const [, setContextState] = useSubscribe(SpiderManContext);

  const handleClickToggleName = () => {
    const oddEven = Math.floor(Math.random() * 2);

    setContextState((prevState) => {
      let { first, last } = prevState.name;

      if (oddEven === 0) {
        first = first === first ? last : first;
      } else {
        last = last === last ? first : last;
      }

      return ({
        ...prevState,
        name: { first, last },
      });
    );
  };

  return (
    <div>
      <FirstNameComponent />
      <LastNameComponent />
      <button onClick={handleClickToggleName}>Toggle name</button>
    </div>
  );
};
```

## Demo

Here's a [demo](https://stoic-kirch-0be43f.netlify.app/).

Be sure to turn on render highlighting with your [React Dev Tool](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) to see the differences between rendering performances between each example.
