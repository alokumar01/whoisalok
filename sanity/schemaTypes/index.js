import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import { codeType } from './code'

export const schema = {
  types: [blockContentType, codeType, categoryType, postType, authorType],
}
