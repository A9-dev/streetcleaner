import { redirect } from "next/navigation";
import {
  Box,
  Typography,
  CardContent,
  Card,
  CardActionArea,
  CardMedia,
  Button,
} from "@mui/material";
import { createClient } from "@/lib/supabase/server";

const CardStyling = {
  padding: "0px 2.5%",
  width: "300px",
  height: "100%",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      <div
        style={{
          justifyContent: "space-evenly",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button href="./store">
          <Typography variant="h5">Purchase Coins</Typography>
        </Button>
        {/* TODO: Modify style of selected button for negative colour */}
        <Button disabled>
          <Typography variant="h5">Shop for Products</Typography>
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "stretch",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <Card sx={CardStyling}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              width="140"
              image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-world.net%2Fwp-content%2Fuploads%2F2020%2F04%2FKFC-Logo.png&f=1&nofb=1&ipt=26f00bca0e2f4ae635aeff681264281c284b3a69faf367c03c6494f6f93c3aed"
              alt="coins"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                KFC 5% Discount
              </Typography>
              <Typography variant="body2">100</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={CardStyling}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              width="140"
              image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.ldlc.com%2Fr1600%2Fld%2Fproducts%2F00%2F06%2F15%2F16%2FLD0006151687.jpg&f=1&nofb=1&ipt=0b1e57a9156a4c8e75203f6417cf774ca67458919a892a33089db5469d919899"
              alt="coins"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Samsung Earbuds
              </Typography>
              <Typography variant="body2">15,000</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={CardStyling}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              width="140"
              image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.boots.com%2Fcontent%2Fdam%2Fboots%2Fservices%2Fboots-services%2FServices_CorporateGiftCard_Hero.dam.ts%253D1622638764808.jpg&f=1&nofb=1&ipt=30e213e726d4065cf73d35895b280781ddf1f0f63e1dea4afa433a9e4becf925"
              alt="coins"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Boots Gift Card (£10)
              </Typography>
              <Typography variant="body2">1,000</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={CardStyling}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              width="140"
              image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-world.net%2Fwp-content%2Fuploads%2F2021%2F04%2FNationwide-Logo-2001-2011.png&f=1&nofb=1&ipt=92dde1eb9ba15e945b503605dffb13863dd700c45673ddedbf977c70e8890db1"
              alt="coins"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                NationWide 7.5% Cashback Scheme
              </Typography>
              <Typography variant="body2">1,500</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </Box>
  );
}
