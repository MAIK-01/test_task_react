import classNames from "classnames";

export const ListItems = ({ items, onCountyClick, country }) => {
  return (
    <ul className="list-country">
      {items.map(item => (
        <li
          className={classNames("list-country__item",{
            active: item.name === country
          })}
          key={item.countryCode}
          onClick={() => {
            onCountyClick(item);
          }}
        >
          {item.name}
        </li>
      )
      )}
    </ul>
  )
};