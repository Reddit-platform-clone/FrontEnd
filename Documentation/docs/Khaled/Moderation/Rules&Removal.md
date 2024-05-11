# Rules & Removal
### Event Handlers
```jsx

const ChangeNewRule = event => {
    if (button === 'Add rule') {
        setNewRule(event.target.value);
    } else if (button === 'Add removal reason') {
        setNewReason(event.target.value);
    }
};


```
#### ChangeNewRule: Handles the change event for the input field (NewRule or NewReason) based on the button state.
#### If button is 'Add rule', it updates NewRule state with the new value.
#### If button is 'Add removal reason', it updates NewReason state with the new value.

### sendNewRule() Function
```jsx

function sendNewRule() {
    if (button === 'Add rule') {
        if (NewRule === '') {
            alert('Enter A rule');
        } else {
            mock.communities[0].Rules.push(NewRule);
        }
    }
    if (button === 'Add removal reason') {
        if (NewReason === '') {
            alert('Enter A reason');
        } else {
            mock.communities[0].RemovalReasons.push(NewReason);
        }
    }
}


```
#### This function is invoked to add a new rule (NewRule) or a new removal reason (NewReason) to a mock data structure (mock.communities[0]).
#### Depending on the current button state:
#### If button is 'Add rule' and NewRule is not empty, it pushes NewRule into the Rules array of mock.communities[0].
#### If button is 'Add removal reason' and NewReason is not empty, it pushes NewReason into the RemovalReasons array of mock.communities[0].

### Styling with actArray
```jsx

const actArray = [];
for (let i = 0; i < 2; i++) {
    if (i === value) {
        actArray.push(`${classes.actMenu} ${classes.QueueButtons}`);
    } else {
        actArray.push(`${classes.QueueButtons}`);
    }
}


```
#### This code segment iterates twice (for i values 0 and 1) to conditionally determine the class names for elements based on the value state.
#### If i matches the value, it adds a combination of CSS classes (${classes.actMenu} ${classes.QueueButtons}) to the actArray.
#### Otherwise, it adds just ${classes.QueueButtons}.

### Conditional Rendering Based on queue
```jsx

if (queue + 1 === 1) {
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="">
          {posts.Banned.length === 0 ? (
            <p>No posts to display.</p>
          ) : (
            posts.Rules.map((item, index) => (
              !hiddenPosts[item.id] ? (
                <div className={`row align- mt-1 ${classes.ModListBox}`}>
                  <div className='col-auto'>
                    <span>{index + 1}</span>
                  </div>
                  <div className='col bg-info'>
                    <span className='align-items-center'>{item}</span>
                  </div>
                </div>
              ) : (
                <div className="hidden-post-card"></div>
              )
            ))
          )}
        </div>
      )}
    </div>
  );
} else if (queue + 1 === 2) {
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="">
          {posts.RemovalReasons.length === 0 ? (
            <p>No posts to display.</p>
          ) : (
            posts.RemovalReasons.map((item, index) => (
              !hiddenPosts[item.id] ? (
                <div className={`row align- mt-1 ${classes.ModListBox}`}>
                  <div className='col-auto'>
                    <span>{index + 1}</span>
                  </div>
                  <div className='col bg-info'>
                    <span className='align-items-center'>{item}</span>
                  </div>
                </div>
              ) : (
                <div className="hidden-post-card"></div>
              )
            ))
          )}
        </div>
      )}
    </div>
  );
}


```
#### Depending on the value of queue + 1:
#### If queue + 1 equals 1, it renders a list of posts (posts.Rules).
#### If queue + 1 equals 2, it renders a list of removal reasons (posts.RemovalReasons).
#### The component checks the value of queue + 1 to determine which list (posts.Rules or posts.RemovalReasons) to render.
#### If queue + 1 is 1, it renders a list of rules (posts.Rules). Each rule item is mapped to a JSX element that displays its content.
#### If queue + 1 is 2, it renders a list of removal reasons (posts.RemovalReasons). Each removal reason item is similarly mapped to a JSX element.
#### The rendering logic includes a loading state (loading ? <p>Loading...</p> : ...) to handle asynchronous data fetching.
#### Each list item (item) is conditionally rendered based on whether its id exists in hiddenPosts, to control visibility (!hiddenPosts[item.id]).