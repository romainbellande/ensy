import { FC } from 'react';
import { Card, CardContent, CardTitle } from '../ui/card';
import { Link } from 'react-router-dom';

export const SideNav: FC = () => {
  return (
    <nav className="pt-24 w-72 h-screen fixed space-y-4 mt-4 px-4">
      <Card>
        <CardTitle>main menu</CardTitle>
        <CardContent>
          <ul>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/referendums">referendums</Link>
            </li>
          </ul>
        </CardContent>
      </Card>
    </nav>
  );
};
