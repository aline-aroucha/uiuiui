# Stepper

Shows where people are in a task split into steps: which steps are done, which one is current and what's left.

```bash
npx @aline-aroucha/uiuiui add stepper
```

## What you provide
- `steps`: an array of `{ label }`, in order, with short names ("Shipping", "Payment").
- `current`: the index of the current step, from 0.
- `label`: a name for the list, such as "Checkout progress" (default "Progress").
- `href` on completed steps only when people may jump back to them and you have decided what happens to the steps after it.

## Usage
- For a linear task of 3 to 7 steps: checkout, onboarding, a long application. For tasks done in any order, use a list of tasks with their status; for a wait, use `Progress`.
- It only informs. Put Back and Continue buttons under the form: Continue checks the step and stays on it with an error if something is wrong; Back returns without losing what was typed.
- The page or card still has a title for the current step; the Stepper doesn't replace it. When the step changes on the same page, move focus to that title.
- A step is complete when its data is valid, not just visited. Reaching the last step isn't success: say the order was placed only once it really was.
- On screens under 640px it shows only the bars and "Step 2 of 4: Shipping"; the step names stay available to screen readers.

## Accessibility
- The steps are an ordered, named list. The current step has `aria-current="step"`, and the others say ", completed" or ", not completed" in words, so screen readers hear "Shipping, current step" and "Cart, completed". It doesn't depend on color: completed steps show a check, the current one is bold with an outlined number.
- "Step 2 of 4: Shipping" is written under the bars, on every screen size.
- It adds no stops to the `Tab` order: Back and Continue are ordinary buttons (`Enter` and `Space`). Completed steps with `href` are links (`Enter`) with a hover color and a solid 2px focus ring.
- When the step changes on the same page, focus moves to the new step's title, so the change is perceived without rereading the page. On an error, people stay on the step and the `Field` error says what to fix; Back keeps their data.

_Adapted from Magoo 1.6.0 by Marcelo Sales: [Step indicator](https://magoo.cc/en/components/navigation/step-indicator.html) (`indicador-etapas`). Magoo is educational guidance; test the behavior in your implementation._
