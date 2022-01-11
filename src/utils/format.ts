/** @format */

export default function format(value: number) {
	return Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'USD',
	}).format(value)
}
