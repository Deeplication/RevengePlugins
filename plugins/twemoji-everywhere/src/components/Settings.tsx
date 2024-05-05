import { React } from "@vendetta/metro/common";
import { useProxy } from "@vendetta/storage";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms, General } from "@vendetta/ui/components";

import { BetterTableRowGroup } from "$/components/BetterTableRow";

import { lang, vstorage } from "..";
import { convert, emojipacks } from "../stuff/twemoji";
import CustomTwemoji from "./CustomTwemoji";

const { ScrollView } = General;
const { FormRow } = Forms;

const emojis = Array.from("😀😁😂🤣😃😄😅😆😋😊😉😎😍😘🥰😗");

export default () => {
  vstorage.emojipack ??= "default";
  useProxy(vstorage);

  const emoji = React.useMemo(
    () => convert(emojis[Math.floor(Math.random() * emojis.length)]),
    [],
  );

  return (
    <ScrollView>
      <BetterTableRowGroup
        title={lang.format("settings.emojipacks.title", {})}
        icon={getAssetIDByName("ic_cog_24px")}
      >
        {Object.entries(emojipacks).map(([id, info]) => (
          <FormRow
            label={lang.format(info.title, {})}
            leading={
              <CustomTwemoji emoji={emoji} src={info.format(emoji)} size={20} />
            }
            trailing={<FormRow.Radio selected={vstorage.emojipack === id} />}
            onPress={() => (vstorage.emojipack = id as any)}
          />
        ))}
      </BetterTableRowGroup>
    </ScrollView>
  );
};
