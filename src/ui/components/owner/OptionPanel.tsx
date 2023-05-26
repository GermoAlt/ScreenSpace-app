import {Drawer} from "react-native-paper";
import {useState} from "react";

export const OptionPanel = () => {
    const [active, setActive] = useState('');
    return (
        <Drawer.Section>
            <Drawer.Item
                label="First Item"
                active={active === 'first'}
                onPress={() => setActive('first')}
            />
            <Drawer.Item
                label="Second Item"
                active={active === 'second'}
                onPress={() => setActive('second')}
            />
        </Drawer.Section>
    );
};
