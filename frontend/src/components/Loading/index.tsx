import { Spin } from 'antd';
import './index.less';

interface LoadingProps {
  spinning?: boolean;
  tip?: string;
  size?: 'small' | 'default' | 'large';
  fullscreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  spinning = true,
  tip = '加载中...',
  size = 'default',
  fullscreen = false,
}) => {
  if (fullscreen) {
    return (
      <div className="loading-fullscreen">
        <Spin spinning={spinning} tip={tip} size={size} />
      </div>
    );
  }

  return <Spin spinning={spinning} tip={tip} size={size} />;
};

export default Loading;