import React, {Component, FC} from 'react'

type Props = {
  props: any
}

const LinkComponent: FC<Props> = ({props}) => {
  const {propMap, node} = props?.data
  const nodeTitle = node[propMap.displayName]

  return (
    <a
      onClick={(e) => {
        props.onNodeClick(e, props?.data)
      }}
      className={`rpm-node-link rpm-inline-block ${node[propMap.linkClasses] || ''}`}
      href={node[propMap.url] || '#'}
    >
      {nodeTitle + '*'}
    </a>
  )
}

export default LinkComponent
