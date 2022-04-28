import { useSelector } from 'react-redux';
import { allIconsUrls } from 'assets/icons';
import { RootState } from 'ducks/store';

export const CategoryList = () => {
  const categories = useSelector((state: RootState) => state.categoriesUsed);

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        // display: 'flex',
        zIndex: 420,
        opacity: 0.95,
        backgroundColor: 'rgba(249, 249, 249, 0.712)',
        paddingTop: 20,
        borderRadius: 20,
      }}
    >
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {categories.length > 0 &&
          allIconsUrls.map(
            (url, index) =>
              index < categories.length && (
                <li key={index}>
                  <img src={url} style={{ padding: 10 }} />
                  <h3
                    style={{
                      display: 'inline',
                      fontWeight: 'bold',
                      paddingRight: 10,
                    }}
                  >
                    {capitalizeFirstLetter(categories[index])}
                  </h3>
                </li>
              )
          )}
      </ul>
    </div>
  );
};
