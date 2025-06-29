import { redirect } from "next/navigation";
import Image from "next/image";
import {
  Box,
  Typography,
  CardContent,
  Card,
  CardActionArea,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import { createClient } from "@/lib/supabase/server";

const ProductCardStyling = {
  padding: "0px 2.5%",
  width: "300px",
  height: "100%",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
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
        gap: 3,
        p: 2,
      }}
    >
      {/* Purchase Coins Banner */}
      <Box
        sx={{
          width: "100%",
          height: 150,
          borderRadius: 3,
          background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 3,
          mb: 2,
          boxShadow: "0 4px 20px rgba(255, 165, 0, 0.3)",
          cursor: "pointer",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 25px rgba(255, 165, 0, 0.4)",
          },
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: "white",
              fontWeight: "bold",
              mb: 1,
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Purchase Coins
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "white",
              opacity: 0.9,
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            Buy coins to increase bounties • Fund community cleanup efforts
          </Typography>
        </Box>
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: 2,
            overflow: "hidden",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            position: "relative",
          }}
        >
          <Image
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngimg.com%2Fuploads%2Fcoin%2Fcoin_PNG36907.png&f=1&nofb=1&ipt=3c6e3db118a59d64eab4981272a02f85884e1aa02971f605e04adb9a57916eef"
            alt="Coins"
            fill
            style={{
              objectFit: "contain",
              padding: "8px",
            }}
          />
        </Box>
      </Box>

      {/* Coin Purchase Options */}
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            flexWrap: "nowrap",
            gap: 2,
            overflowX: "auto",
            pb: 2,
          }}
        >
          <Card
            sx={{
              padding: "0px 2.5%",
              width: "300px",
              height: "100%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngimg.com%2Fuploads%2Fcoin%2Fcoin_PNG36907.png&f=1&nofb=1&ipt=3c6e3db118a59d64eab4981272a02f85884e1aa02971f605e04adb9a57916eef"
                alt="coins"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  100
                </Typography>
                <Typography variant="body2">£0.99</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                }}
              >
                Buy
              </Button>
            </CardActions>
          </Card>
          <Card
            sx={{
              padding: "0px 2.5%",
              width: "300px",
              height: "100%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngimg.com%2Fuploads%2Fcoin%2Fcoin_PNG36907.png&f=1&nofb=1&ipt=3c6e3db118a59d64eab4981272a02f85884e1aa02971f605e04adb9a57916eef"
                alt="coins"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  250
                </Typography>
                <Typography variant="body2">£2.99</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                }}
              >
                Buy
              </Button>
            </CardActions>
          </Card>
          <Card
            sx={{
              padding: "0px 2.5%",
              width: "300px",
              height: "100%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngimg.com%2Fuploads%2Fcoin%2Fcoin_PNG36907.png&f=1&nofb=1&ipt=3c6e3db118a59d64eab4981272a02f85884e1aa02971f605e04adb9a57916eef"
                alt="coins"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  500
                </Typography>
                <Typography variant="body2">£5.99</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                }}
              >
                Buy
              </Button>
            </CardActions>
          </Card>
          <Card
            sx={{
              padding: "0px 2.5%",
              width: "300px",
              height: "100%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngimg.com%2Fuploads%2Fcoin%2Fcoin_PNG36907.png&f=1&nofb=1&ipt=3c6e3db118a59d64eab4981272a02f85884e1aa02971f605e04adb9a57916eef"
                alt="coins"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  1,000
                </Typography>
                <Typography variant="body2">£9.99</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                }}
              >
                Buy
              </Button>
            </CardActions>
          </Card>
          <Card
            sx={{
              padding: "0px 2.5%",
              width: "300px",
              height: "100%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngimg.com%2Fuploads%2Fcoin%2Fcoin_PNG36907.png&f=1&nofb=1&ipt=3c6e3db118a59d64eab4981272a02f85884e1aa02971f605e04adb9a57916eef"
                alt="coins"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  10,000
                </Typography>
                <Typography variant="body2">£99.99</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                }}
              >
                Buy
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Box>

      {/* Patagonia Banner */}
      <Box
        sx={{
          width: "100%",
          height: 150,
          borderRadius: 3,
          background: "linear-gradient(135deg, #66BB6A 0%, #388E3C 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 3,
          mb: 2,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              color: "white",
              fontWeight: "bold",
              mb: 1,
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Patagonia Gift Cards
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "white",
              opacity: 0.9,
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            Redeem your coins for Patagonia gift cards!
          </Typography>
        </Box>
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: 2,
            overflow: "hidden",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            position: "relative",
          }}
        >
          <Image
            src="https://worldvectorlogo.com/logos/patagonia.svg"
            alt="Patagonia Logo"
            fill
            style={{
              objectFit: "contain",
              padding: "8px",
            }}
          />
        </Box>
      </Box>

      {/* Patagonia Products Section */}
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "stretch",
            flexWrap: "nowrap",
            gap: 3,
            overflowX: "auto",
            pb: 2,
          }}
        >
          <Card sx={ProductCardStyling}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                width="140"
                image="https://worldvectorlogo.com/logos/patagonia.svg"
                alt="Patagonia Gift Card"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  £10 Patagonia Gift Card
                </Typography>
                <Typography variant="body2">1,000 coins</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                }}
              >
                Buy
              </Button>
            </CardActions>
          </Card>
          <Card sx={ProductCardStyling}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                width="140"
                image="https://worldvectorlogo.com/logos/patagonia.svg"
                alt="Patagonia Gift Card"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  £25 Patagonia Gift Card
                </Typography>
                <Typography variant="body2">2,500 coins</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                }}
              >
                Buy
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Box>

      {/* KFC Banner */}
      <Box
        sx={{
          width: "100%",
          height: 150,
          borderRadius: 3,
          background: "linear-gradient(135deg, #FF6B6B 0%, #FF5722 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 3,
          mb: 2,
          boxShadow: "0 4px 20px rgba(255, 87, 34, 0.3)",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              color: "white",
              fontWeight: "bold",
              mb: 1,
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            KFC Store
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "white",
              opacity: 0.9,
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            Finger lickin&apos; good deals • Exclusive KFC rewards
          </Typography>
        </Box>
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: 2,
            overflow: "hidden",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            position: "relative",
          }}
        >
          <Image
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-world.net%2Fwp-content%2Fuploads%2F2020%2F04%2FKFC-Logo.png&f=1&nofb=1&ipt=26f00bca0e2f4ae635aeff681264281c284b3a69faf367c03c6494f6f93c3aed"
            alt="KFC Logo"
            fill
            style={{
              objectFit: "contain",
              padding: "8px",
            }}
          />
        </Box>
      </Box>

      {/* KFC Products Section */}
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "stretch",
            flexWrap: "nowrap",
            gap: 3,
            overflowX: "auto",
            pb: 2,
          }}
        >
          <Card sx={ProductCardStyling}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                width="140"
                image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-world.net%2Fwp-content%2Fuploads%2F2020%2F04%2FKFC-Logo.png&f=1&nofb=1&ipt=26f00bca0e2f4ae635aeff681264281c284b3a69faf367c03c6494f6f93c3aed"
                alt="KFC logo"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  KFC 5% Discount
                </Typography>
                <Typography variant="body2">100 coins</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                }}
              >
                Buy
              </Button>
            </CardActions>
          </Card>
          <Card sx={ProductCardStyling}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                width="140"
                image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-world.net%2Fwp-content%2Fuploads%2F2020%2F04%2FKFC-Logo.png&f=1&nofb=1&ipt=26f00bca0e2f4ae635aeff681264281c284b3a69faf367c03c6494f6f93c3aed"
                alt="KFC logo"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Free Original Recipe Piece
                </Typography>
                <Typography variant="body2">250 coins</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                }}
              >
                Buy
              </Button>
            </CardActions>
          </Card>
          <Card sx={ProductCardStyling}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                width="140"
                image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-world.net%2Fwp-content%2Fuploads%2F2020%2F04%2FKFC-Logo.png&f=1&nofb=1&ipt=26f00bca0e2f4ae635aeff681264281c284b3a69faf367c03c6494f6f93c3aed"
                alt="KFC logo"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  KFC 10% Off Buckets
                </Typography>
                <Typography variant="body2">400 coins</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                }}
              >
                Buy
              </Button>
            </CardActions>
          </Card>
          <Card sx={ProductCardStyling}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                width="140"
                image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-world.net%2Fwp-content%2Fuploads%2F2020%2F04%2FKFC-Logo.png&f=1&nofb=1&ipt=26f00bca0e2f4ae635aeff681264281c284b3a69faf367c03c6494f6f93c3aed"
                alt="KFC logo"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Free Zinger Burger
                </Typography>
                <Typography variant="body2">600 coins</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                }}
              >
                Buy
              </Button>
            </CardActions>
          </Card>
          <Card sx={ProductCardStyling}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                width="140"
                image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-world.net%2Fwp-content%2Fuploads%2F2020%2F04%2FKFC-Logo.png&f=1&nofb=1&ipt=26f00bca0e2f4ae635aeff681264281c284b3a69faf367c03c6494f6f93c3aed"
                alt="KFC logo"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Family Feast 15% Off
                </Typography>
                <Typography variant="body2">800 coins</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                }}
              >
                Buy
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Box>

      {/* Products Banner */}
      <Box>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ textAlign: "center", mb: 3 }}
        ></Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "stretch",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: 150,
              borderRadius: 3,
              background: "linear-gradient(135deg, #B39DDB 0%, #512DA8 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 3,
              mb: 2,
              boxShadow: "0 4px 20px #7E57C2",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  mb: 1,
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                Partnered Products
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  opacity: 0.9,
                  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                }}
              >
                Shop Hot New Deals!
              </Typography>
            </Box>
          </Box>
          {/* Products */}

          <Card sx={ProductCardStyling}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                width="140"
                image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.ldlc.com%2Fr1600%2Fld%2Fproducts%2F00%2F06%2F15%2F16%2FLD0006151687.jpg&f=1&nofb=1&ipt=0b1e57a9156a4c8e75203f6417cf774ca67458919a892a33089db5469d919899"
                alt="Samsung earbuds"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Samsung Earbuds
                </Typography>
                <Typography variant="body2">15,000 coins</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                }}
              >
                Buy
              </Button>
            </CardActions>
          </Card>
          <Card sx={ProductCardStyling}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                width="140"
                image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.boots.com%2Fcontent%2Fdam%2Fboots%2Fservices%2Fboots-services%2FServices_CorporateGiftCard_Hero.dam.ts%253D1622638764808.jpg&f=1&nofb=1&ipt=30e213e726d4065cf73d35895b280781ddf1f0f63e1dea4afa433a9e4becf925"
                alt="Boots gift card"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Boots Gift Card (£10)
                </Typography>
                <Typography variant="body2">1,000 coins</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                }}
              >
                Buy
              </Button>
            </CardActions>
          </Card>
          <Card sx={ProductCardStyling}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                width="140"
                image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-world.net%2Fwp-content%2Fuploads%2F2021%2F04%2FNationwide-Logo-2001-2011.png&f=1&nofb=1&ipt=92dde1eb9ba15e945b503605dffb13863dd700c45673ddedbf977c70e8890db1"
                alt="Nationwide logo"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Nationwide 7.5% Cashback
                </Typography>
                <Typography variant="body2">1,500 coins</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                }}
              >
                Buy
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
