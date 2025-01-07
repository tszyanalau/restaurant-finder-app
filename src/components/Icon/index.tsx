import classNames from 'classnames'

type IconProps = React.HTMLAttributes<HTMLElement> & {
  type: string
}

const Icon = ({ className, type }: IconProps) => <i className={classNames(className, 'bi', `bi-${type}`)} />

export default Icon
