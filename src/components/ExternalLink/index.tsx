import classNames from 'classnames'
import Icon from '../Icon'

const ExternalLink = ({ href, className, children }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a href={href} target="_blank" rel="noreferrer" className={classNames(className, 'text-decoration-none')}>
    {children} <Icon type="box-arrow-up-right" />
  </a>
)

export default ExternalLink
