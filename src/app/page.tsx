import { Input } from '@/components/ui/input';
import RootLayout from './layout';
import ConfigRender from '@/feature/config-renderer/config-renderer';

const Home = () => {
  return (
    <RootLayout>
      <ConfigRender />
    </RootLayout>
  );
};

export default Home;
