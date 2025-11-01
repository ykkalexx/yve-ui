import { render } from "@testing-library/react";
import { Button } from "./Button";

describe(`Component: ${Button.name}`, () => {
  it("should render correctly", () => {
    const { container } = render(<Button>Test Button</Button>);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <button
          class="text-white bg-[#424242] font-light px-6 py-3 rounded-full"
        >
          Test Button
        </button>
      </div>
    `);
  });
});
