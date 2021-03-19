# Scenario: I can have a player

As a Player I want to create a new Player so that I can play the game

[x] Player starts with 1 colonised home system
[x] Home sytem starts with an initial population of 100m
[x] Player starts with 3 unexplored systems

# Scenario: I can explore star systems

As a player I want to explore unexplored star systems so that I can find systems to colonise

[x] Player can explore an unexplored system
[x] When exploring a system, new unexplored systems become available

-   [Future] Exploring systems uses energy
-   [Future] When exploring a system, details of planet(s) are revealed

# Scenario: I can colonise star systems

As a player I want to colonise star systems so that I can increase my population

_Note: We're simplifying the concept of 'planets' for now by colonising entire systems_

[x] Player can colonise a star system that has a suitable environment
[x] Player cannot colonise a star system with unsuitable environment, an existing colony, unexplored or not visible
[x] Initial colony population 0.1m 

-   [Future] Initial colony population 0.1-0.4m, or custom amount subtracted from home
-   [Future] Colonising systems uses energy

# Scenario: My star systems generate energy

As a player I want to generate energy so I can perform actions

-   A star system generates energy at a rate based on population
-   Player can store a maximum energy
-   Player's energy stores are replenished from systems periodically (TBD - 1 sec, 30 secs..)

# Conceptual Objects

## App has a StarSystem concept

[x] A system has an ID - See: https://zelark.github.io/nano-id-cc/ 
[x] A system has a name
[x] A system has environment suitability

- Population growth (1%/yr, 0.0833)

-   [Future] system environment types to enable population effects and terraforming e.g. https://en.wikipedia.org/wiki/List_of_planet_types
-   [Future] has planets
-   [Future] Distance from player? or other explored?

## App has Player concept

[x] A player has a home system with a suitable environment
[x] A player has visible systems
[x] A player has explored systems
[x] A player has colonised systems

## App has Colony concept

- A colony has an associated star system
- A colony is owned by a player
- A colony has a population


---

## Energy with useEffect

```
    const [energy, updateEnergy] = useState(1000);

    useEffect(() => {
        const timer = setTimeout(() => {
            updateEnergy(energy + 1);
        }, 1000);
        // Clear timeout if the component is unmounted
        return () => clearTimeout(timer);
    });
```

```
    <div>
        <span>{energy}</span>
    </div>
```

## Other notes

- Need to handle thrown errors
- https://www.space.com/26603-interstellar-starship-colony-population-size.html