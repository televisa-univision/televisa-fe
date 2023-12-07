![logocarousel](https://user-images.githubusercontent.com/31081/34867511-fedd2348-f745-11e7-971a-69513ed905b4.png)

*For everything that doesn't needs a swipe, if you need one use slick.*

The main goal was to create a component that could easily switch navigation from mobile and desktop fullfilling the expected usability for each device and future designs.

Arrows don't work well in mobile, the user move his or her finger naturally across the interface; they work though, in desktop where we can easily click but not so with swiping.

## Good examples

![good](https://user-images.githubusercontent.com/31081/34867655-95a477e0-f746-11e7-8223-bed9388205ab.png)


## Bad Example

![bad](https://user-images.githubusercontent.com/31081/34867662-9dada600-f746-11e7-8cde-cf9635ab7317.png)


Another requirement that I thought was to create a component that could easily add partial showing of elements for both platforms without fighting with CSS, for designs like this.

![screen shot 2018-01-12 at 2 30 25 am](https://user-images.githubusercontent.com/31081/34867711-c3983484-f746-11e7-8857-cf1555a74755.png)

This component has two types of navigation, using pagination and by moving one item at a time, in both flavours it will respect the partial navigation.

![screen shot 2018-01-12 at 3 15 20 am](https://user-images.githubusercontent.com/31081/34867752-ec693156-f746-11e7-99c7-3ed265228a31.png)

![screen shot 2018-01-12 at 3 15 40 am](https://user-images.githubusercontent.com/31081/34867755-efdd7ba8-f746-11e7-88ab-ca23099b5f86.png)

### Props

| Props                       | Type          | Default Value | Description                              |
| --------------------------- | ------------- | ------------- | ---------------------------------------- |
| `children`                  | `node`        | `''`          | components childs                        |
| `className`                 | `string`      | `''`          | Modifier CSS class                       |
| `usePagination`             | `bool`        | `false`       | Activates pagination mode                |
| `itemsToBeDisplayed`        | `enum`        | `4`           | Can either be a number or an object with the number of items per breakpoint |
| `itemsToBeDisplayedDefault` | `number`      | `4`           | if itemsToBeDisplayed is set with an object, this is used for the missing breakpoints |
| `leftArrow`                 | React Element | `null`        | React element for prev arrow             |
| `rightArrow`                | React Element | `null`        | React element for next arrow             |
| `leftArrowClassName`        | `string`      | `''`          | Modifier class for the left arrow        |
| `rightArrowClassName`       | `string`      | `''`          | Modifier class for the right arrow       |
| `maskWrapper`               | `string`      | `''`          | Modifier class for the mask wrapper      |
| `maskContainer`             | `string`      | `''`          | Modifier class for the mask container    |
| `partialShowing`            | `bool`        | `false`       | Activates partial showing                |
| `arrowTheme`                | `enum`        | `dark`        | Can be light or dark for arrow theme     |
| `mobilePeek`                | `number`      | `'8'`         | Amount peeking in mobile for next slide  |
| `selectedItem`              | `number`      | `null`        | Marks the selected item with the `isselected` prop as string `'true'` |
| `goToItem`                  | `number`      | `'null'`      | Scrolls the carousel to the given item   |
| `switchToDesktop`           | `number`      | `'768'`       | Defines the number at which the carousel switch between mobile and desktop |
| `prevAction`                | `func`        | `null`        | Left arrow callback                      |
| `nextAction`                | `func`        | `null`        | Right arrow callback                     |
| `afterPageChange`           | `fun`         | `null`        | Callback after the carousel changes the number of pages, breakpoint and the current page, returns an object with numberOfPages and currentPage |
| `separator`                 | `enum`        | `8`           | Can either be a number or an object with the width for separator in an specific breakpoint |
| `separatorDefaultValue`     | `number`      | `8`           | if separator is set with an object, this is used for the missing breakpoints |

### Methods
* `goToPrev()`   - function called to change previous slide
* `goToNext()`   - function called to change next slide
* `goToPage(slideNumber)` - function called to change current slide

## FAQ

### Does it has autoplay?
No, and I don't think that would be a good idea; the component it's flexible as it is. You can take a look to the `complicated example` in component base where I put callbacks and methods to create dots navigation like Instagram and other sites. So you can surely creates an autoplay without much efforts. But let's try to keep the component simple, remember that we're trying to get rid of Slick, not trying to create a new one.

### Can we use it for X case?
Yes! as long as the design doesn't needs swiping, this component fits perfectly.

### Can I modify the number of elements to show by breakpoint?
Yes, check `itemsToBeDisplayed`, you can set this by breakpoints or a number.

### Can I put a tracker? Someone from product want to know if the users use the arrows
Yes, you can bind a function to `prevAction` and `nextAction`

### Why did you put so many variables instead of using parenthesis in the formulas?
This component is _Prettier_ friendly, one of the caveats with Prettier is that it removes parenthesis when they're needed. So I added those extra const in the code to keep it compatible if one day we decide to add Prettier in the building process.

---
### Update
![logo](https://user-images.githubusercontent.com/31081/34966670-02185304-fa23-11e7-964c-f535a8cb03c0.png)

This new version adds
- Server-Side rendering
- Lazy loading
- Separator prop

Check this [document](https://docs.google.com/document/d/1mXk-1f5J_QBrBlqkxamgj3ZWhb1k8rgxf6ITecF1Hcw) with more information
