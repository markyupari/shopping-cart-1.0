import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, describe, it, expect, vi } from "vitest";
import App from "./App";
import { api } from "./Api";

const mockCreateItem = (api.createItem = vi.fn());
test("mocking api", async () => {
  const productsList = [
    {
      id: 0,
      attributes: {
        Name: "mockFruit1",
        Country: "mockCountry1",
        Cost: 100,
        Instock: 50,
      },
    },
    {
      id: 1,
      attributes: {
        Name: "mockFruit2",
        Country: "mockCountry2",
        Cost: 200,
        Instock: 60,
      },
    },
    {
      id: 2,
      attributes: {
        Name: "mockFruit3",
        Country: "mockCountry3",
        Cost: 300,
        Instock: 70,
      },
    },
    {
      id: 3,
      attributes: {
        Name: "mockFruit4",
        Country: "mockCountry4",
        Cost: 400,
        Instock: 80,
      },
    },
  ];
  mockCreateItem.mockResolvedValueOnce(productsList);
  const { getByText, getByLabelText } = render(<App />);
  const button = getByText("Restock Products");
  fireEvent.click(button);

  await waitFor(() => getByText(/mockFruit1/));

  expect(mockCreateItem).toBeCalledTimes(1);
  expect(mockCreateItem).toBeCalledWith(expect.objectContaining([]));
  expect(mockCreateItem).toHaveReturned(expect.objectContaining(productsList));
});
