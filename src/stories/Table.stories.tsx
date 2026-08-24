import type { Meta, StoryObj } from "@storybook/react-vite"
import { Table, THead, TBody, Tr, Th, Td } from "../index"

const meta: Meta<typeof Table> = {
  title: "Keynote/Table",
  component: Table,
}
export default meta

export const Benchmark: StoryObj<typeof Table> = {
  render: () => (
    <div style={{ padding: "2rem", background: "var(--kn-background)" }}>
      <Table>
        <THead>
          <Tr>
            <Th>Result</Th>
            <Th>Share</Th>
          </Tr>
        </THead>
        <TBody>
          <Tr>
            <Td highlight>Shipped</Td>
            <Td>~1/3</Td>
          </Tr>
          <Tr>
            <Td highlight>Flat / inconclusive</Td>
            <Td>~1/3</Td>
          </Tr>
          <Tr>
            <Td highlight>Harmful</Td>
            <Td>~1/3</Td>
          </Tr>
        </TBody>
      </Table>
    </div>
  ),
}
