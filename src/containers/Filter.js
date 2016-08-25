import Filterer from './Filterer'
import Sorted from './Sorted'
import FilterControls from '../components/FilterControls'

export const Filter = Filterer(Sorted(FilterControls))

export default Filter
